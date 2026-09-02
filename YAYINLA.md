# Marsak Tesisat — GitHub Pages ile Yayına Alma

Kod statik siteye dönüştürüldü ve derlemesi doğrulandı (42 sayfa). Aşağıdaki 3 adımı sırayla yap.

## Adım 0 — Workflow dosyasını yerleştir

Güvenlik nedeniyle `.github/workflows/` altına uzaktan dosya yazamıyorum, bu tek dosyayı senin
koyman gerekiyor. Sohbetteki **deploy.yml** dosyasını indir ve şuraya kaydet:

```
D:\tesisat sitesi\.github\workflows\deploy.yml
```

`.github` ve `workflows` klasörleri yoksa oluştur.

Alternatif: GitHub'da repoya git → **Actions** sekmesi → **set up a workflow yourself** →
dosyanın içeriğini yapıştır → **Commit**. Bu yolu seçersen Adım 1'den önce
`git pull` yapmayı unutma.

## Adım 1 — Değişiklikleri GitHub'a gönder

`D:\tesisat sitesi` klasöründe bir terminal (PowerShell) aç ve şunları çalıştır:

```
cd "D:\tesisat sitesi"
git rm -r --cached src/app/admin src/app/api src/components/admin
git add -A
git commit -m "GitHub Pages icin statik export + dogru alan adi"
git push origin main
```

> `git rm -r --cached` komutu admin panelini ve API rotalarını repodan çıkarır.
> Statik sitede sunucu olmadığı için bunlar çalışamıyor; dosyalar diskinde kalır.

## Adım 2 — GitHub'da Pages'i aç

1. https://github.com/EnesAlyakut/tesisat-sitesi/settings/pages adresine git
2. **Source** kısmını **GitHub Actions** yap
3. Kaydet

Push'tan sonra Actions sekmesinde derleme başlar. 2-3 dakika sürer.
Bittiğinde site şu adreste yayında olur: `https://enesalyakut.github.io/tesisat-sitesi/`

## Adım 3 — Alan adını bağla (Wix'te)

Önce GitHub'da: Settings → Pages → **Custom domain** kutusuna `www.marsaktesisat.com` yaz ve kaydet.

Sonra Wix'te: https://manage.wix.com/account/domains → `marsaktesisat.com` → **...** menüsü → DNS kayıtlarını yönet.

Şu kayıtları gir:

**A kayıtları** (ana alan adı için — `@` veya boş host):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME kaydı** (www için):

```
Host:  www
Değer: enesalyakut.github.io
```

Yayılma 15 dakika ile birkaç saat sürer. Sonrasında GitHub otomatik olarak SSL sertifikası üretir — Settings → Pages'te **Enforce HTTPS** kutusunu işaretle.

## Önemli notlar

- **Wix siteni silme.** DNS değişene kadar eski site yayında kalsın, yeni site çalıştığı doğrulandıktan sonra karar ver.
- **Wix Premium aboneliğini** de yeni site çalışana kadar iptal etme; alan adı kaydın orada duruyor.
- Bundan sonra `main` dalına her push otomatik olarak siteyi yeniden yayına alır.

## Statik sürümde kaybolanlar

- **Admin paneli** (`/admin`) — sunucu gerektiriyor, statik sitede çalışamaz.
- **Güvenlik başlıkları** (CSP, HSTS vb.) — GitHub Pages'te sunucu başlığı ayarlanamıyor.
- **Sunucu tarafı yönlendirmeler** — `/hizmetlerimiz`, `/anasayfa`, `/gokturk`, `/arnavutkoy` için
  yerlerine yönlendirme sayfaları koydum, çalışıyorlar.

İçerik güncellemek istediğinde `data/services.json` ve `data/admin-content.json` dosyalarını
düzenleyip push etmen yeterli — site otomatik yenilenir.
