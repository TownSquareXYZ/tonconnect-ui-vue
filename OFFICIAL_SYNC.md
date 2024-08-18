# Sync with Official Releases

We are committed to providing our users with a reliable and continuously optimized Kit, so we will keep in close sync with the official release, and whenever a new official version is released, we will quickly update it to ensure that our Kit will always include the latest features, fixes, and improvements. Additionally, we conduct regular compatibility tests and performance optimizations based on the official release cadence to ensure you get the best experience possible. Whether it's the introduction of new features or security enhancements, you can rest assured that you can rely on us to stay consistent and on the cutting edge with the official release.

## process description

1. get the latest npm version to compare

2. if inconsistent, select the latest tag with version number to compare and get the patch file
  a. get all tags
  b. select the tags to compare
  c. get the patch file

3. parse patch and compare tonconnect react update content

4. if only package.json version and tonconnect ui version have changed

5. pull our package file and update these fields
  a. pull the latest code
  b. update package.json

6. create a new branch and commit the changes

7. merge the branch into main

8. trigger github action to automatically update log and publish to npm

9. after successful merge, remove the created branch

10. if the patch contains more than just version updates, create an issue to be notified
  a. if the patch contains other significant changes, create an issue on github to be notified about the updates

11. if any request fails after step 3, create an issue, making sure there is only one issue per problem


 ![Official_Sync_Process_Flowchart_image](./public/official_sync_process_flowchart.png)
