// ===== Кнопка "Наверх" =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.textContent = '↑';
scrollTopBtn.style.position = 'fixed';
scrollTopBtn.style.bottom = '30px';
scrollTopBtn.style.right = '30px';
scrollTopBtn.style.padding = '10px 15px';
scrollTopBtn.style.fontSize = '20px';
scrollTopBtn.style.display = 'none';
scrollTopBtn.style.cursor = 'pointer';
scrollTopBtn.style.zIndex = '1000';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top:0, behavior:'smooth'});
});

// ===== Аккордеон для команды =====
const accordionItems = document.querySelectorAll('.team-grid .member h4');
accordionItems.forEach(title => {
  title.style.cursor = 'pointer';
  const content = title.nextElementSibling;
  content.style.display = 'none';
  title.addEventListener('click', () => {
    accordionItems.forEach(t=>t.nextElementSibling.style.display='none');
    content.style.display = content.style.display==='none'?'block':'none';
  });
});

// ===== Фильтрация галереи =====
const galleryImages = document.querySelectorAll('#gallery .grid img');

function createFilterButtons() {
  const filterContainer = document.createElement('div');
  filterContainer.className = 'filters';
  filterContainer.style.marginBottom = '1rem';
  const categories = ['all', 'concert', 'studio']; // только эти категории
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.dataset.category = cat;
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.style.marginRight = '10px';
    btn.style.padding = '5px 10px';
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => filterGallery(cat));
    filterContainer.appendChild(btn);
  });
  document.querySelector('#gallery').prepend(filterContainer);
}

function filterGallery(category) {
  galleryImages.forEach((img, index) => {
    if (category === 'all') {
      img.style.display = 'block';
    } else if (category === 'concert') {
      // Два первых изображения
      img.style.display = index < 2 ? 'block' : 'none';
    } else if (category === 'studio') {
      // Два последних изображения
      img.style.display = index >= galleryImages.length - 2 ? 'block' : 'none';
    }
  });
}

createFilterButtons();

// ===== Модальное окно =====
const modal=document.createElement('div');
modal.id='modal';
modal.style.display='none';
modal.style.position='fixed';
modal.style.top='0';
modal.style.left='0';
modal.style.width='100%';
modal.style.height='100%';
modal.style.backgroundColor='rgba(0,0,0,0.8)';
modal.style.justifyContent='center';
modal.style.alignItems='center';
modal.style.zIndex='1001';
modal.style.cursor='pointer';
modal.innerHTML=`<img id="modalImg" style="max-width:90%; max-height:90%;">`;
document.body.appendChild(modal);

galleryImages.forEach(img=>{
  img.style.cursor='pointer';
  img.addEventListener('click',()=>{ modal.style.display='flex'; document.getElementById('modalImg').src=img.src; });
});
modal.addEventListener('click',()=>{ modal.style.display='none'; });

// ===== Навигация между секциями =====
const buttons=document.querySelectorAll('.nav-btn');
const sections=document.querySelectorAll('.content');
buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    sections.forEach(sec=>sec.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});
