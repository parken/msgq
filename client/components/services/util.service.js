class utilService {

  pages(numFound, limit) {
    const pages = [];
    const numPages = numFound / limit;
    const mod = numFound % limit;
    for(let i=1; i <= numPages; i++) {
      pages.push(i);
    }
    if (mod) pages.push(pages.length + 1);
    return pages;
  }

}

export default utilService;
