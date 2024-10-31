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

Please note that for a lot of bookmarklets to work, ***pop-ups*** need to be ***enabled*** in the ***settings*** of the browser. Also, do not execute a bookmarklet from the blank or starting page of a browser, but go to an active webpage first.

### AdsAnalysis bookmarklet 
Made this bookmarklet thanks to the excellent presentation of Craig Silverman on OSMOSIS 2024. Once installed, click your bookmark when you are on the website to check if ads.txt is present. If so, it will open up a second tab to look in well-known.dev for more information. Make sure to login to well-know.dev to see more.

### BuiltwithCensys bookmarklet 🔮
This bookmarklet takes any analytics code as input and will drop it in Builtwith.com and Censys.io to find any attached domains to the analytics code. Merged two of my bookmarklets into one.

### EmailFinder bookmarklet :e-mail:
If you want to search for (hidden) e-mailadresses in the text or source code of a webpage (including in comments), click this bookmarklet. If there are e-mail addresses present, it will return them in a new window. Otherwise a pop-up will state that nothing has been found. 

### FB Marketplace User 🤑
Visit a Facebook profile, then click the bookmarklet. This will extract the userID from the source code and add it to the FB marketplace URL. An easy way to see if there is a Marketplace profile active for the user.
### FBFriendExtractor bookmarklet :iphone:
If you are on the page of a FB profile, click on the friends tab. The URL should be https://facebook.com/ID/friends. After that, refresh the page by pressing F5 and click on the bookmarklet. It will AutoScroll through the page and extract all URLs that contain 'facebook.com' on the page. It's built to only show unique links and exclude links with the word 'photo'. It's still a bit rough around the edges, since it will also collect links from likes and maps. This bookmarklet is easier then using the Chrome extension Instant Data Scraper for example. Do be careful, overuse of this bookmarklet can get your FB account banned :skull:

### LinkFinder bookmarklet 🔗:
If you want to search for (hidden) links in the text or source code of a webpage (including in comments), click this bookmarklet. If there are links present, it will return them in a new window.

### WhatsMyName bookmarklet :suspect:
Click the bookmarklet to enter a username to search for on WhatsMyName.app. Press *enter* and a new tab will open where the search will begin on the site. Happy OSINTing!

<br>  
Please use these scripts in a professional manner.
