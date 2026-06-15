async function test() {
  try {
    const res = await fetch('http://localhost:8080/api/v1/merchants/1/promotions');
    const promotions = await res.json();
    console.log('Promotions:', promotions.slice(0, 3));
  } catch(e) {
    console.error(e);
  }
}
test();
