function getRandomIntInclusive(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1); // The maximum is inclusive and the minimum is inclusive
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

<<<<<<< HEAD
function sortByKey(org, compare, key) {
  if (org[key] < compare[key]) {
    return -1;
  } if (org[key] > compare[key]) {
=======
function sortFunction(org, comparison, key) {
  if (org[key] < comparison[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
>>>>>>> 1f589382d61739e7e31d3581ed70007a5f201e39
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  // set fave to yes
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
<<<<<<< HEAD
    .then((fromServer) => {
      console.log(fromServer)
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const newArr = range(10);
      const newArr2 = newArr.map(() => {
        const number = getRandomIntInclusive(0, 243);
        return fromServer[number];
      });

      const reverseList = newArr2.sort((org, compare) => sortByKey(org, compare, 'name'));
      const ul = document.createElement('ol');
      ul.className = 'flex-inner';
      $('form').prepend(ul);

      reverseList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(ul).append(li);
      });
=======
    .then((jsonFromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      
      console.log('jsonFromServer', jsonFromServer);
      const reverseList = newArr2.sort((a, b) => sortFunction(b, a, 'name'));
>>>>>>> 1f589382d61739e7e31d3581ed70007a5f201e39
    })
    .catch((err) => {
      console.log(err)
      // set fave to no
    });
});