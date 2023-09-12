# Motivasyonunum

Tiyatro kültürünün günümüzde değer kaybının farkında olarak sanatın eski olmasından mı kaynaklıdır bilinmez tiyatroların çoğunun güncel bir internet sitesine sahip olmadığını hatta internet sayfalarının bile bulunmadığını fark ettim. Teknolojinin her yere olduğu gibi tiyatro sanatına da bir faydası dokunmasını istedim.

# Amacım

Yazdığım yazılım insanlara yalnızca internet ve bir internete erişimli herhangi bir cihaz ile herhangi bir yerden herhangi bir anda temsili tiyatro salonumdaki tiyatrolara göz atma, bu tiyatroların tanıtımlarını okuma, oyuncu kadrosuna bakma, fiyat ve seanslarına bakma herhangi bir tiyatroya gitmeyi planladığındaysa bilet almasını sağlamaktadır

Kullanıcı bir hesap oluşturmamış olsa dahi tüm tiyatroların tüm özelliklerini görebilmektedir ücretsiz ve kolayca bir hesap oluşturup dilerse bilet satın alımı da gerçekleştirebilir, profilini düzenleyebilir.

Yazdığım yazılım temsili tiyatro şirketi içinde oldukça kolaylıklar tanımakta 'admin' yetkisine sahip kullanıcıların erişebildiği yönetim paneli sayesinde şirket istatistiklerine göz atabilir, kullanıcıları listeleyerek dilediğini kaldırabilir veya düzenleyebilir ve aynı şekilde tiyatro ekleyebilir, düzenleyebilir veya kaldırabilir.

# Projemde kullandığım veri tabanı ve tabloları

Tiyatro gösterilerinin tutulduğu mysql tablosu
![Tiyatroların gösterilerinin tutulduğu mysql tablosu](/readme-images/theatres-database-table.png)
<br/><br/>

Kayıtlı kullanıcıların tutulduğu mysql tablosu
![Kayıtlı kullanıcıların tutulduğu mysql tablosu](/readme-images/users-database-table.png)
<br/><br/>

İstatistiklerin tutulduğu mysql tablosu
![İstatistiklerin tutulduğu mysql tablosu](/readme-images/data-database-table.png)

# Proje tanıtımı

## Özellikler

- Beyaz ve Siyah olmak üzere 2 ayrı tema seçeneği
  - Aşağıda gösterilecek olan resimlerin çoğu da bu sebeple 2 ye bölünmüştür
- Responsive tasarım. Mobil, tablet ve bilgisayarlara ayrı ayrı render edilerek uyumlu bir internet sayfası görmenize yardımcı olur
- Yerel kayıt. Giriş yapılı bulunduğunuz hesap, seçtiğiniz tema gibi özellikleri yerel olarak kaydederek her sayfa yenilemenizde tekrar giriş yapma veya tema değiştirme durumunu engeller
- Bileşenlerine ayrılmış bir sayfa. React components sayesinde sayfadaki hareketleriniz esnasında tüm sayfayı yeniden yüklemek yerine yalnızca gerekli alanları yeniler bu sayede sayfa içerisinde yüksek hızlarda dolaşabilirsiniz.
- Kullanıcı dostu. Sayfa üzerinde kullanıcılara kolaylıklar sağlaması için bir çok element bulunmakta bunlardan bir kaçı, navigation bar üzerinde bilet listesi, tiyatro listesi için filtreleme seçeneği, yönetim paneli için sütunlara ayrıştırılmış tablolar

## Sayfalar

Projemde temel olarak 4 ana sayfa bulunmakta bunlar sırasıyla

<br/>

Tiyatroların listelendiği ana sayfa
![ana sayfa görseli](/readme-images/main-page.png)
<br/><br/>

Salon tanıtımınının yapıldığı sayfa
![salonumuz sayfası görseli](/readme-images/place-page.png)

Ayrıca bu sayfa üzerinden resimleri büyüterek daha detaylı da bakabilirsiniz
![salonumuz sayfası görseli](/readme-images/open-image.png)
<br/><br/>

Şirket tanıtımını yapabileceğiniz hakkımızda sayfası
![şirket tanıtım sayfası görseli](/readme-images/company-page.png)
<br/><br/>

Biletlerinizi görüntüleyebileceğiniz ve profilinizi düzenleyebileceğiniz profilim sayfası
![profil sayfası görseli](/readme-images/profile-light.png)
<br/><br/>

Bir tiyatro gösterisine tıkladığınız durumda size detaylarını verecektir
![tiyatro ekleme sayfası](/readme-images/theatre-detail.png)
<br/><br/>

Dilerseniz biraz aşağı kaydırarak giriş yapılı hesabınız için bir bilette alabilirsiniz
![tiyatro ekleme sayfası](/readme-images/theatre-seats.png)
<br/><br/>

<br/><br/>

Ayrıca bahsettiğim üzere sadece yetkililerin görebileceği bir yönetim paneli de bulunmakta

Yönetim paneline veya web sayfasında bulunmayan bir adrese gitmek isteyen kullanıcılar için 404 Hatası
![404 sayfası](/readme-images/error.png)
<br/><br/>

Yetkili bir hesaptaysanız istatistikleri görebileceğiniz gösterge paneli
![dashboard sayfası](/readme-images/dashboard.png)
<br/><br/>

Kullanıcı ve tiyatrolar listesi aynı zamanda düzenle butonu ile düzenleyebilir veya kaldır ile kaldırabilirsiniz bu sayfalar üzerinden
![list sayfası](/readme-images/list.png)
<br/><br/>

Tiyatro eklemek için ise formu doldurmanız yeterlidir
![tiyatro ekleme sayfası](/readme-images/tiyatro-ekle.png)
<br/><br/>
