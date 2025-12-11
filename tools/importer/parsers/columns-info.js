/* global WebImporter */

/**
 * Parser for columns-info block
 *
 * Source: https://www.nagase.co.jp/color/
 * Base Block: columns
 *
 * Block Structure:
 * - Single row with 2 columns
 * - Each column contains: heading, description, link
 *
 * Source HTML Pattern:
 * <div class="home__search--type">
 *   <div>
 *     <a href="/link1/">
 *       <h5>Heading 1</h5>
 *       <p>Description 1</p>
 *     </a>
 *     <a href="/link2/">
 *       <h5>Heading 2</h5>
 *       <p>Description 2</p>
 *     </a>
 *   </div>
 * </div>
 *
 * Generated: 2025-12-11
 */
export default function parse(element, { document }) {
  // Extract both link elements (2 columns)
  const links = Array.from(element.querySelectorAll('a'));

  const cells = [];
  const row = [];

  // Process each link as a column
  links.forEach((link) => {
    const cell = [];

    // Extract heading (h5, h4, or h3)
    const heading = link.querySelector('h5, h4, h3');
    if (heading) cell.push(heading);

    // Extract description paragraph
    const description = link.querySelector('p');
    if (description) cell.push(description);

    // Add the link itself
    cell.push(link.cloneNode(false));

    row.push(cell);
  });

  // Add the row if we have columns
  if (row.length > 0) {
    cells.push(row);
  }

  // Fallback: if no links found, try generic content extraction
  if (cells.length === 0) {
    const headings = Array.from(element.querySelectorAll('h5, h4, h3'));
    const paragraphs = Array.from(element.querySelectorAll('p'));

    if (headings.length >= 2) {
      // Create two columns from available content
      const col1 = [headings[0]];
      if (paragraphs[0]) col1.push(paragraphs[0]);

      const col2 = [headings[1]];
      if (paragraphs[1]) col2.push(paragraphs[1]);

      cells.push([col1, col2]);
    }
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns-Info',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
