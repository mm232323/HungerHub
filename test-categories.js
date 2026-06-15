async function test() {
  try {
    const resProducts = await fetch('http://localhost:8080/api/v1/products');
    const products = await resProducts.json();

    const resCategories = await fetch('http://localhost:8080/api/v1/categories');
    const categories = await resCategories.json();

    console.log('Categories:', categories.slice(0, 3));
    console.log('Products:', products.slice(0, 3).map(p => ({ id: p.id, name: p.name, category: p.category })));
  } catch(e) {
    console.error(e);
  }
}
test();
