/* global WebImporter */

/**
 * Transformer for Nagase website cleanup
 * Removes site-wide non-content elements before block parsing
 */

export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    // Remove header and navigation (handled by AEM auto-population)
    const header = element.querySelector('header.header');
    if (header) header.remove();

    const nav = element.querySelector('nav.nav');
    if (nav) nav.remove();

    // Remove footer (handled by AEM auto-population)
    const footer = element.querySelector('footer.footer');
    if (footer) footer.remove();

    // Remove OneTrust cookie consent banner and dialogs
    const cookieBanner = element.querySelector('#onetrust-consent-sdk');
    if (cookieBanner) cookieBanner.remove();

    const cookieDialog = element.querySelector('#onetrust-banner-sdk');
    if (cookieDialog) cookieDialog.remove();

    const cookiePC = element.querySelector('#onetrust-pc-sdk');
    if (cookiePC) cookiePC.remove();

    // Remove iframes (tracking, analytics)
    const iframes = element.querySelectorAll('iframe');
    iframes.forEach((iframe) => iframe.remove());

    // Clean up empty divs left behind
    const emptyDivs = element.querySelectorAll('div:empty');
    emptyDivs.forEach((div) => div.remove());
  }

  if (hookName === 'afterTransform') {
    // No post-processing needed for this site
  }
}
