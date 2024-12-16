// Tarif verilerini LocalStorage'dan yükle veya boş bir dizi oluştur
let tarifler = JSON.parse(localStorage.getItem('tarifler')) || [];

// Tarifleri sayfaya ekleme fonksiyonu
function tarifleriGoster() {
    const tariflerDiv = document.getElementById('tarifler');
    if (!tariflerDiv) return; // Eğer tariflerDiv bulunamazsa fonksiyondan çık

    tariflerDiv.innerHTML = ''; // Mevcut içeriği temizle

    tarifler.forEach((tarif, index) => {
        // Tarif kartı oluşturma
        const kart = document.createElement('div');
        kart.classList.add('tarif-karti');

        // Resim ekleme
        const resim = document.createElement('img');
        resim.src = tarif.resim;
        resim.alt = tarif.isim;
        kart.appendChild(resim);

        // İsim ekleme
        const isim = document.createElement('h2');
        isim.textContent = tarif.isim;
        kart.appendChild(isim);

        // Açıklama ekleme
        const aciklama = document.createElement('p');
        aciklama.textContent = tarif.aciklama;
        kart.appendChild(aciklama);

        // Tarif kartını ana bölüme ekleme
        tariflerDiv.appendChild(kart);
    });
}

// Yeni tarif ekleme fonksiyonu
function tarifiEkle(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

    // Form verilerini al
    const isimInput = document.getElementById('isim');
    const resimInput = document.getElementById('resim');
    const aciklamaInput = document.getElementById('aciklama');

    const isim = isimInput.value.trim();
    const resim = resimInput.value.trim();
    const aciklama = aciklamaInput.value.trim();

    // Form doğrulama
    if (isim === '' || resim === '' || aciklama === '') {
        alert('Lütfen tüm alanları doldurunuz.');
        return;
    }

    // Yeni tarif objesi oluştur
    const yeniTarif = {
        isim: isim,
        resim: resim,
        aciklama: aciklama
    };

    // Yeni tarifi tarifler dizisine ekle
    tarifler.push(yeniTarif);

    // Tarifleri LocalStorage'a kaydet
    localStorage.setItem('tarifler', JSON.stringify(tarifler));

    // Formu sıfırla
    isimInput.value = '';
    resimInput.value = '';
    aciklamaInput.value = '';

    // Kullanıcıyı ana sayfaya yönlendir
    window.location.href = 'index.html';
}

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    // Eğer tarif ekle sayfasındaysak form olay dinleyicisini ekle
    const tarifFormu = document.getElementById('tarifFormu');
    if (tarifFormu) {
        tarifFormu.addEventListener('submit', tarifiEkle);
    }

    // Ana sayfadaysak tarifleri göster
    tarifleriGoster();
});
