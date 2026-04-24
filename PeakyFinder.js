javascript:

(async () => {

  const origin = location.origin;
  const domain = location.hostname;
  const TAB_NAME = "Peaky-Finder-report";
  const utcNow = new Date().toISOString();

  const files = [
    { name: "ads.txt", paths: ["/ads.txt"] },
    { name: "humans.txt", paths: ["/humans.txt"] },
    { name: "security.txt", paths: ["/.well-known/security.txt", "/security.txt"] },
    { name: "llms.txt", paths: ["/llms.txt"] },
    { name: "sitemap.xml", paths: ["/sitemap.xml"] },
    { name: "robots.txt", paths: ["/robots.txt"] }
  ];

  const escapeHtml = (str) =>
    String(str ?? "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m]));

  const toCSV = (val) =>
    `"${String(val ?? "").replace(/"/g, '""')}"`;

  function looksLikeHTML(text, contentType) {
    const t = (text || "").toLowerCase();
    const ct = (contentType || "").toLowerCase();
    return ct.includes("text/html") || t.includes("<html") || t.includes("<body");
  }

  function isValidFile(name, text, contentType) {
    const t = (text || "").trim();
    if (!t) return false;
    if (looksLikeHTML(t, contentType)) return false;

    switch (name) {
      case "ads.txt":
        return t.split("\n").some(line => {
          const l = line.trim();
          return l && !l.startsWith("#") && l.includes(",");
        });

      case "robots.txt":
        return /user-agent:|disallow:|allow:|sitemap:/i.test(t);

      case "security.txt":
        return /^contact:/im.test(t) || /^policy:/im.test(t) || /^expires:/im.test(t);

      case "sitemap.xml":
        if (!/<urlset|<sitemapindex/i.test(t)) return false;
        try {
          const xml = new DOMParser().parseFromString(t, "application/xml");
          return !xml.querySelector("parsererror");
        } catch {
          return false;
        }

      default:
        return t.length > 20;
    }
  }

  function parseFile(name, text) {
    const t = (text || "").trim();
    if (!t) return [];

    if (name === "ads.txt") {
      return t
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("#"))
        .map((line, i) => {
          const parts = line.split(",").map(x => x.trim());
          return {
            index: i + 1,
            exchange: parts[0] || "",
            publisher_id: parts[1] || "",
            relationship: parts[2] || "",
            cert_authority_id: parts[3] || ""
          };
        });
    }

    if (name === "robots.txt") {
      return t
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("#"))
        .map((line, i) => {
          const idx = line.indexOf(":");
          return idx > 0
            ? {
                index: i + 1,
                directive: line.slice(0, idx).trim(),
                value: line.slice(idx + 1).trim()
              }
            : {
                index: i + 1,
                line
              };
        });
    }

    if (name === "sitemap.xml") {
      try {
        const xml = new DOMParser().parseFromString(t, "application/xml");

        const urlNodes = [...xml.querySelectorAll("url")];
        if (urlNodes.length) {
          return urlNodes.map((u, i) => ({
            index: i + 1,
            loc: u.querySelector("loc")?.textContent?.trim() || "",
            lastmod: u.querySelector("lastmod")?.textContent?.trim() || "",
            changefreq: u.querySelector("changefreq")?.textContent?.trim() || "",
            priority: u.querySelector("priority")?.textContent?.trim() || ""
          }));
        }

        const sitemapNodes = [...xml.querySelectorAll("sitemap")];
        return sitemapNodes.map((s, i) => ({
          index: i + 1,
          loc: s.querySelector("loc")?.textContent?.trim() || "",
          lastmod: s.querySelector("lastmod")?.textContent?.trim() || ""
        }));
      } catch {
        return [];
      }
    }

    return t
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"))
      .map((line, i) => {
        const idx = line.indexOf(":");
        return idx > 0
          ? {
              index: i + 1,
              key: line.slice(0, idx).trim(),
              value: line.slice(idx + 1).trim()
            }
          : {
              index: i + 1,
              line
            };
      });
  }

  async function fetchFile(file) {
    for (const path of file.paths) {
      const url = origin + path;

      try {
        const res = await fetch(url, { cache: "no-store" });
        const contentType = res.headers.get("content-type") || "";
        const text = res.ok ? await res.text() : "";

        if (res.ok && isValidFile(file.name, text, contentType)) {
          return {
            name: file.name,
            url,
            status: res.status,
            ok: true,
            contentType,
            text,
            rows: parseFile(file.name, text),
            preview: text.slice(0, 2000)
          };
        }
      } catch {}
    }

    return {
      name: file.name,
      url: origin + file.paths[0],
      status: "not found",
      ok: false,
      contentType: "",
      text: "",
      rows: [],
      preview: ""
    };
  }

  const results = [];
  for (const file of files) {
    results.push(await fetchFile(file));
  }

  const reportWindow = window.open("", TAB_NAME);

  if (!reportWindow) {
    alert("Popup blocked.");
    return;
  }

  const csvRows = [[
    "timestamp_utc",
    "file",
    "found",
    "status",
    "url",
    "index",
    "key",
    "value",
    "extra_1",
    "extra_2"
  ]];

  results.forEach(result => {
    if (result.rows.length) {
      result.rows.forEach(row => {
        csvRows.push([
          utcNow,
          result.name,
          result.ok ? "yes" : "no",
          result.status,
          result.url,
          row.index || "",
          row.key || row.directive || "",
          row.value || row.loc || row.exchange || "",
          row.publisher_id || row.lastmod || row.relationship || row.changefreq || "",
          row.cert_authority_id || row.priority || ""
        ]);
      });
    } else {
      csvRows.push([
        utcNow,
        result.name,
        "no",
        result.status,
        result.url,
        "",
        "",
        "",
        "",
        ""
      ]);
    }
  });

  const csvText = csvRows.map(row => row.map(toCSV).join(",")).join("\n");

  function renderTable(rows) {
    if (!rows.length) return "<p>No valid content</p>";

    const keys = [...new Set(rows.flatMap(row => Object.keys(row)))];

    return `
      <table>
        <tr>${keys.map(key => `<th>${escapeHtml(key)}</th>`).join("")}</tr>
        ${rows.map(row => `
          <tr>
            ${keys.map(key => `<td>${escapeHtml(row[key] ?? "")}</td>`).join("")}
          </tr>
        `).join("")}
      </table>
    `;
  }

  reportWindow.document.write(`
    <html>
      <head>
        <title>PeakyFinder - By K2SOSINT and some GPT magic</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
          table { border-collapse: collapse; width: 100%; margin: 10px 0 20px; }
          th, td { border: 1px solid #ccc; padding: 6px; text-align: left; vertical-align: top; }
          th { background: #eee; }
          pre {
            background: #f6f6f6;
            padding: 10px;
            white-space: pre-wrap;
            word-break: break-word;
            border: 1px solid #ddd;
          }
          .file-block {
            margin: 24px 0;
            padding: 16px;
            border: 1px solid #ddd;
          }
          .actions {
            margin: 8px 0 12px;
          }
          .actions a, .actions button, .top-actions button {
            margin-right: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Site File Check</h1>
        <p><strong>Domain:</strong> ${escapeHtml(domain)}</p>
        <p><strong>Collected (UTC):</strong> ${escapeHtml(utcNow)}</p>

        <div class="top-actions">
          <button onclick="downloadCSV()">Download CSV</button>
        </div>

        <table>
          <tr>
            <th>File</th>
            <th>Found</th>
            <th>Status</th>
            <th>URL</th>
            <th>Rows parsed</th>
          </tr>
          ${results.map(result => `
            <tr>
              <td>${escapeHtml(result.name)}</td>
              <td>${result.ok ? "✅" : "❌"}</td>
              <td>${escapeHtml(result.status)}</td>
              <td><a href="${escapeHtml(result.url)}" target="_blank">${escapeHtml(result.url)}</a></td>
              <td>${result.rows.length}</td>
            </tr>
          `).join("")}
        </table>

        ${results.map((result, index) => `
          <div class="file-block">
            <h2>${escapeHtml(result.name)} ${result.ok ? "✅" : "❌"}</h2>
            <p><strong>URL:</strong> <a href="${escapeHtml(result.url)}" target="_blank">${escapeHtml(result.url)}</a></p>

            ${result.ok ? `
              <div class="actions">
                <a href="${escapeHtml(result.url)}" target="_blank">Open full file</a>
                <button onclick="downloadRawFile(${index})">Download raw file</button>
              </div>
            ` : ""}

            ${renderTable(result.rows)}

            ${result.preview ? `
              <details>
                <summary>Raw preview (first 2000 characters)</summary>
                <pre>${escapeHtml(result.preview)}</pre>
              </details>
            ` : ""}
          </div>
        `).join("")}

        <script>
          const csvText = ${JSON.stringify(csvText)};
          const results = ${JSON.stringify(results.map(result => ({
            name: result.name,
            ok: result.ok,
            text: result.text
          })))};

          function downloadBlob(content, filename, type) {
            const blob = new Blob([content], { type });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 1000);
          }

          function downloadCSV() {
            downloadBlob(csvText, ${JSON.stringify(domain + "-files.csv")}, "text/csv");
          }

          function downloadRawFile(index) {
            const result = results[index];
            if (!result || !result.ok) return;
            downloadBlob(result.text, ${JSON.stringify(domain)} + "-" + result.name, "text/plain");
          }
        </script>
      </body>
    </html>
  `);

  reportWindow.document.close();

})();
