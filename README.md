# K2SOsint-Bookmarklets
A small collection of bookmarklets that are useful for OSINT.

# Bookmarklets tested on:
The bookmarklets work on the following browsers:
<p float="left">
<img src="https://img.shields.io/badge/Brave-FF7139?style=for-the-badge&logo=Brave&logoColor=white">
<img src="https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white">
<img src="https://img.shields.io/badge/Firefox_Browser-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white">
<img src="https://img.shields.io/badge/Microsoft_Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white">
<br>
  
# How to use:
Copy and paste the JavaScript into a new bookmark at the same place where the URL normally goes. Don't forget to give the bookmark a name so you can remember its function. After saving you can click the bookmark to activate the script. 

Please note that for a lot of bookmarklets to work, ***pop-ups*** need to be ***enabled*** in the ***settings*** of the browser. Also, do not execute a bookmarklet from the blank or starting page of a browser, but go to an online website first.

### Censys bookmarklets
When you encounter an Analytics code in the source code of a webpage during your investigations, you can click the bookmarklet. Enter the Analytics number in the pop-up screen and press *Enter*. The search will then be executed in search.censys.io. 

### EmailFinder bookmarklet
If you want to search for (hidden) e-mailadresses in the text or source code of a webpage, click this bookmarklet. If there are e-mail addresses present, it will return them in a new window. Otherwise a pop-up will state that nothing has been found. 

### FBFriendExtractor bookmarklet
If you are on the page of a FB profile, click on the friends tab. The URL should be https://facebook.com/ID/friends. After that, refresh the page by pressing F5 and click on the bookmarklet. It will AutoScroll through the page and extract all URLs that contain 'facebook.com' on the page. It's built to only show unique links and exclude links with the word 'photo'. It's still a bit rough around the edges, since it will also collect links from likes and maps. This bookmarklet is easier then using the Chrome extension Instant Data Scraper for example. Do be careful, overuse of this bookmarklet can get your FB account banned. 

### WhatsMyName bookmarklet
Click the bookmarklet to enter a username to search for on WhatsMyName.app. Press *enter* and a new tab will open where the search will begin on the site. Happy OSINTing!

<br>  
Please use these scripts in a professional manner.
