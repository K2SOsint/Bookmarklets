javascript:(function(){
  function detectType(value){
    if(/^[0-9a-f]{32}$/i.test(value))return "md5";
    if(/^[0-9a-f]{40}$/i.test(value))return "sha1";
    if(/^[0-9a-f]{64}$/i.test(value))return "sha256";
    if(/^\d{1,3}(\.\d{1,3}){3}$/.test(value))return "ip";
    if(/^[\w.-]+\.[a-z]{2,}$/i.test(value))return "domain";
    return "unknown";
  }

  var selection = window.getSelection().toString().trim();
  var value = selection || window.location.hostname || window.location.href;
  var encoded = encodeURIComponent(value);
  var type = detectType(value);

  var container = document.createElement("div");
  container.style = `
    position:fixed;
    top:20px;
    right:20px;
    z-index:999999;
    background:#fff;
    color:#000;
    padding:16px 20px;
    border-radius:12px;
    box-shadow:0 4px 20px rgba(0,0,0,0.4);
    font-family:Arial, sans-serif;
    font-size:14px;
    max-width:260px;
  `;

  container.innerHTML = `
    <div style="font-weight:bold;margin-bottom:8px;">CTI Companion - by K2SOSINT</div>
    <div style="margin-bottom:10px;font-size:13px;word-wrap:break-word;">
      <b>Target:</b> ${value}<br>
      <b>Type:</b> ${type}
    </div>
    <div id="osint-buttons" style="display:flex;flex-direction:column;gap:6px;"></div>
    <button id="osint-close"
      style="margin-top:8px;background:#444;color:#fff;border:none;
             padding:6px;border-radius:6px;cursor:pointer;font-weight:bold;">
      Close
    </button>
  `;
  document.body.appendChild(container);

  var btns = {
    domain:[
      ["VirusTotal",`https://www.virustotal.com/gui/domain/${encoded}`],
      ["URLScan",`https://urlscan.io/search/#${encoded}`],
      ["Shodan",`https://www.shodan.io/search?query=hostname%3A${encoded}`],
      ["Whois",`https://www.whois.com/whois/${encoded}`],
      ["crt.sh",`https://crt.sh/?q=${encoded}`],
      ["Censys",`https://search.censys.io/search?resource=hosts&q=${encoded}`]
    ],
    ip:[
      ["VirusTotal",`https://www.virustotal.com/gui/ip-address/${encoded}`],
      ["Shodan",`https://www.shodan.io/host/${encoded}`],
      ["AbuseIPDB",`https://www.abuseipdb.com/check/${encoded}`],
      ["Censys",`https://search.censys.io/hosts/${encoded}`],
      ["GreyNoise",`https://viz.greynoise.io/ip/${encoded}`]
    ],
    md5:[
      ["VirusTotal",`https://www.virustotal.com/gui/file/${encoded}`],
      ["MalwareBazaar",`https://bazaar.abuse.ch/browse.php?search=${encoded}`],
      ["Triage",`https://tria.ge/s?q=${encoded}`],

    ],
    sha1:[
      ["VirusTotal",`https://www.virustotal.com/gui/file/${encoded}`],
      ["MalwareBazaar",`https://bazaar.abuse.ch/browse.php?search=${encoded}`],
      ["Triage",`https://tria.ge/s?q=${encoded}`]
    ],
    sha256:[
      ["VirusTotal",`https://www.virustotal.com/gui/file/${encoded}`],
      ["MalwareBazaar",`https://bazaar.abuse.ch/browse.php?search=${encoded}`],
      ["Hybrid Analysis",`https://www.hybrid-analysis.com/search?query=${encoded}`],

    ],
    unknown:[
      ["VirusTotal",`https://www.virustotal.com/gui/search/${encoded}`],
      ["URLScan",`https://urlscan.io/search/#${encoded}`],
      ["Censys",`https://search.censys.io/search?resource=hosts&q=${encoded}`]
    ]
  };

  var list = btns[type] || btns.unknown;
  var buttonDiv = container.querySelector("#osint-buttons");

  list.forEach(([label,link])=>{
    var b=document.createElement("button");
    b.textContent=label;
    b.style=`
      background:#2563eb;
      color:#fff;
      border:none;
      padding:8px;
      border-radius:6px;
      cursor:pointer;
      text-align:center;
      font-weight:bold;
      line-height:1.2;
      transition:all 0.15s ease;
    `;
    b.onmouseover=()=>b.style.background="#1e40af";
    b.onmouseout=()=>b.style.background="#2563eb";
    b.onclick=()=>window.open(link,"_blank");
    buttonDiv.appendChild(b);
  });

  container.querySelector("#osint-close").onclick=()=>container.remove();
})();
