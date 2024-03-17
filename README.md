# ✓ JkAnime V2
>  Discover the updated jkanime v2 scrapper: effortlessly extract data and stream the latest anime episodes with no restrictions. Access the entire catalog for free! 🚀

- Currently in development...

## 📦 Installation
```shell
npm install jkanime-v2
yarn add jkanime-v2
```

# 📚 Documentation

## `function getAnimeServers(animeId: string, chapter: number): Promise<string[] | null>:`
*Important: Keep in mind that it takes about 2 to 3 seconds to return the URLs. The implementation should be improved.*

```ts
const animeId = 'tokyo-ghoulre'
const animeChapter = 1
const response = await getAnimeServers(animeId, animeChapter)
```
```text
[
  'https://jkanime.net/c4.php?u=aHR0cHM6Ly9zZmFzdHdpc2guY29tL2Uvem5pODdnNHJjdXlw&s=streamwish',
  'https://jkanime.net/c4.php?u=aHR0cHM6Ly92b2Uuc3gvZS95em1zMGNpeXJpajc=&s=voe',
  'https://jkanime.net/c4.php?u=aHR0cHM6Ly9tZGJla2p3cWEucHcvZS9kcW1vbnF2Z2N4azExZw==&s=mixdrop',
  'https://jkanime.net/c4.php?u=aHR0cHM6Ly93d3cubXA0dXBsb2FkLmNvbS9lbWJlZC1sYnFzcXJtbWJlNjEuaHRtbA==&s=mp4upload',
  'https://jkanime.net/c4.php?u=aHR0cHM6Ly9maWxlbW9vbi5zeC9lL2dreW0yZTJkeGFwZi8=&s=filemoon',
  'https://jkanime.net/c4.php?u=aHR0cHM6Ly9zdHJlYW10YXBlLmNvbS9lL2tMckFSTGVra0J0WWozLzAxLm1wNA==&s=streamtape'
]
```

## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/ChrisMichaelPerezSantiago) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.

---

### **:robot: Author**

_*Chris M. Perez*_

> You can follow me on
> [github](https://github.com/ChrisMichaelPerezSantiago)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright ©2022 [jkanime-v2](https://github.com/ChrisMichaelPerezSantiago/jkanime-v2).
