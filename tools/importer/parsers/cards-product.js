/* global WebImporter */

/**
 * Parser for cards-product block
 *
 * Source: https://www.nagase.co.jp/color/
 * Base Block: cards
 *
 * Block Structure:
 * - Multiple rows, each with 1-3 columns
 * - Each card contains: heading, company/subtitle, description, link
 *
 * Source HTML Patterns:
 * Pattern 1: Grid of product cards in <div><a>...</a><a>...</a></div>
 * Pattern 2: Single card in <div class="home__search--preparation"><a>...</a></div>
 * Pattern 3: Service links in <ul><li><a><span>...</span></a></li></ul>
 * Pattern 4: External links in <ul class="home__bnr__list"><li><a>...</a></li></ul>
 *
 * Generated: 2025-12-11
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1 & 2: Direct <a> children (product cards or single cards)
  const directLinks = Array.from(element.querySelectorAll(':scope > a'));

  if (directLinks.length > 0) {
    // Group links into rows (2 per row for grid layout)
    for (let i = 0; i < directLinks.length; i += 2) {
      const row = [];

      // First column
      const link1 = directLinks[i];
      const cell1 = [];

      // Extract heading (h4 or h5)
      const heading1 = link1.querySelector('h5, h4');
      if (heading1) cell1.push(heading1);

      // Extract all paragraphs (company name and description)
      const paras1 = Array.from(link1.querySelectorAll('p'));
      cell1.push(...paras1);

      // Add the link itself
      cell1.push(link1.cloneNode(false));

      row.push(cell1);

      // Second column (if exists)
      if (i + 1 < directLinks.length) {
        const link2 = directLinks[i + 1];
        const cell2 = [];

        const heading2 = link2.querySelector('h5, h4');
        if (heading2) cell2.push(heading2);

        const paras2 = Array.from(link2.querySelectorAll('p'));
        cell2.push(...paras2);

        cell2.push(link2.cloneNode(false));

        row.push(cell2);
      }

      cells.push(row);
    }
  }

  // Pattern 3: <ul> with <li><a><span> (service links)
  const serviceItems = Array.from(element.querySelectorAll('ul > li > a'));

  if (serviceItems.length > 0) {
    // Group into rows of 3 for service sections
    for (let i = 0; i < serviceItems.length; i += 3) {
      const row = [];

      for (let j = 0; j < 3 && i + j < serviceItems.length; j++) {
        const link = serviceItems[i + j];
        const cell = [];

        // Extract heading from span or direct text
        const heading = link.querySelector('span, h3, h4, h5');
        if (heading) {
          cell.push(heading);
        }

        // Add link
        cell.push(link.cloneNode(false));

        row.push(cell);
      }

      cells.push(row);
    }
  }

  // If no cards found, try to extract any content generically
  if (cells.length === 0) {
    const heading = element.querySelector('h4, h5, h3');
    const description = element.querySelector('p');
    const link = element.querySelector('a');

    if (heading || description || link) {
      const cell = [];
      if (heading) cell.push(heading);
      if (description) cell.push(description);
      if (link) cell.push(link);
      cells.push([cell]);
    }
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Product',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
