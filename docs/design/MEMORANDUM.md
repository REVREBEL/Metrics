# OPERATIONAL LIMITS & PERSISTENT NOTES

## 🚨 CRITICAL API PAYLOAD LIMITATION (DO NOT IGNORE)

1. **20MB Hard Payload Limit**: The GitHub REST API (and typical execution network stacks) enforces a hard upload limit of **20 MB** per file. 
2. **Base64 Expansion Overhead**: Base64 serialization increases binary size by **~33%** in transit. Therefore, any binary asset (such as PNG high-res mockups) exceeding **15 MB** on disk will crash the push/commit actions with `422 Unprocessable Entity` or connection timeouts.
3. **No Heavy Binaries**: Do **NOT** attempt to push heavy raster binaries directly inside the execution loop. Instead:
   - Prefer lightweight SVG vector code embedded inside Markdown specifications.
   - For heavy images, utilize external URL references or split them into optimized chunks under **5 MB**.
   - If an upload loop is detected, suspend commits immediately and report back rather than retrying indefinitely and crashing the connection.
