/* global WebImporter */

/**
 * Parser for hero-landing block
 *
 * Source: https://www.nagase.co.jp/color/
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Decorative heading image, subtitle paragraph, and CTA link
 *
 * Source HTML Pattern:
 * <div class="home__hero">
 *   <div>
 *     <img src="background.jpg">
 *     <h2><img src="heading.png" alt="Value Creation with Color"></h2>
 *     <p>Subtitle text</p>
 *     <p><a href="/link/">CTA text</a></p>
 *   </div>
 * </div>
 *
 * Generated: 2025-12-11
 */
export default function parse(element, { document }) {
  // Extract decorative heading image from h2
  const headingImg = element.querySelector('h2 img') ||
                     element.querySelector('img[alt*="Value"]') ||
                     element.querySelector('h2') ||
                     element.querySelector('h1, h3');

  // Extract subtitle paragraph (first p without a link)
  const paragraphs = Array.from(element.querySelectorAll('p'));
  const subtitle = paragraphs.find(p => !p.querySelector('a')) ||
                   element.querySelector('p');

  // Extract CTA link (p containing a, or just a)
  const ctaLink = element.querySelector('p > a') ||
                  element.querySelector('a');

  // Build cells array - single row with all content
  const cells = [];

  // Combine heading image, subtitle, and CTA into one cell
  const contentCell = [];
  if (headingImg) contentCell.push(headingImg);
  if (subtitle) contentCell.push(subtitle);
  if (ctaLink) contentCell.push(ctaLink);

  cells.push(contentCell);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Hero-Landing',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
