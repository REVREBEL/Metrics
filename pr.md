🔒 Security: Add rel="noopener noreferrer" to external links

🎯 **What:**
Added the `rel="noopener noreferrer"` attribute to `<Link>` tags that use `target="_blank"`.

⚠️ **Risk:**
When a link opens a new tab using `target="_blank"` without the `rel="noopener"` attribute, the new page gains access to the `window.opener` object of the original page. A malicious website could exploit this to redirect the original page to a phishing site or execute a cross-site scripting (XSS) attack (a technique known as reverse tabnabbing).

🛡️ **Solution:**
Adding `rel="noopener noreferrer"` ensures that the newly opened tab runs in a separate process and cannot access the `window.opener` property of the referring page, effectively preventing reverse tabnabbing vulnerabilities.
