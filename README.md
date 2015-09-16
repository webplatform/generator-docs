# WebPlatform Docs static site generator

**In progress, refer to the [Progress report](#progress-report)**

This repository serves as a static-site generator for *docs.webplatform.org*, anything related generating HTML.

No content should be stored in this repo, but only what it takes to generate the docs pages.
The content itself is pulled in this workspace as git submodule so we can compile the static HTML files.

To get the docs pages, refer to the following git repositories.

| Directory     | Submodule                          | Note                |
|--------------:|:----------------------------------:|---------------------|
| **src/**      | [webplatform/docs][docs]           | The main docs pages |
| **src/Meta/** | [webplatform/docs-meta][docs-meta] | Archived content that needed to be moved during mass imports. We kept them there to cherry-pick and merge into the main content section. Was accessible under the URL *docs.webplatform.org/wiki/Meta:...* |
| **src/WPD/**  | [webplatform/docs-wpd][docs-wpd]   | Community and notes section. Was accessible under the URL *docs.webplatform.org/wiki/WPD:...* |


## Progress report

End goal is to have a (almost) fully functional site without using any backend technology.

Any page you can see on *docs.webplatform.org* should be visible on the new version.


### Staging version

To test out the latest run, use the following static web server.

http://67.205.56.184/


### Tasks

What’s left to do prior to use this project to replace WebPlatform Docs MediaWiki instance.

Roughly [all issues described in **webplatform/mediawiki-conversion**](https://github.com/webplatform/mediawiki-conversion/issues?q=is%3Aopen+is%3Aissue).

* [x] [Convert MediaWiki history into Git source-controlled text files](https://github.com/webplatform/mediawiki-conversion/issues/4)
* [x] [Pass a filter to every page to make it suitable for a static site generator](https://github.com/webplatform/mediawiki-conversion/issues/9)
* [ ] [Reproduce directory listing for pages without content](https://github.com/webplatform/mediawiki-conversion/issues/3)
* [x] [Make sure all uploads are visible from generated site](https://github.com/webplatform/mediawiki-conversion/issues/5)
* [ ] ~~[Reproduce search functionality](https://github.com/webplatform/mediawiki-conversion/issues/8)~~ (at least leave metadata to help making the feature)
* [ ] [Ensure ALL URLs are kept with appropriate redirects](https://github.com/webplatform/mediawiki-conversion/issues/6) (almost there! **needs testing**)
* [ ] [Get list of views the static site won’t be reproducing anymore so we can create appropriate "410 Gone" response #11](https://github.com/webplatform/mediawiki-conversion/issues/11)



## How was it done?

To learn how the conversion was done, take a look at the [MediaWiki conversion project][mediawiki-conversion] utility and the [content converter][content-converter] library.

  [docs-wpd]: https://github.com/webplatform/docs-wpd
  [docs-meta]: https://github.com/webplatform/docs-meta
  [docs]: https://github.com/webplatform/docs
  [mediawiki-conversion]: https://github.com/webplatform/mediawiki-conversion "MediaWiki Conversion utility"
  [content-converter]: https://github.com/webplatform/content-converter "Content Converter abstract library"

