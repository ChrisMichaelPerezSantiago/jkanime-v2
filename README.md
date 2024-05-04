# ✓ JkAnime V2
>  Discover the updated jkanime v2 scrapper: effortlessly extract data and stream the latest anime episodes with no restrictions. Access the entire catalog for free! 🚀

## 📦 Installation
```shell
npm install jkanime-v2
yarn add jkanime-v2
```

# 📚 Documentation

## `function latestAnimeAdded(): Promise<Anime[] | null>`
The latestAnimeAdded API allows users to get the latest anime added to the catalog.
```ts
const response = await latestAnimeAdded()
```
```json
[
  {
    "slug": "watashi-no-shiawase-na-kekkon-watashi-no-shiawase-na-katachi",
    "title": "Watashi no Shiawase na Kekkon: Watashi no Shiawase na Katachi",
    "synopsis": null,
    "episodes": null,
    "image": "https://cdn.jkdesu.com/assets/images/animes/image/watashi-no-shiawase-na-kekkon-watashi-no-shiawase-na-katachi.jpg",
    "type": "OVA",
    "status": "Concluido"
  },
  {
    "slug": "shen-zhiyi-jiao",
    "title": "Shen Zhiyi Jiao",
    "synopsis": null,
    "episodes": null,
    "image": "https://cdn.jkdesu.com/assets/images/animes/image/shen-zhiyi-jiao.jpg",
    "type": "ONA",
    "status": "En emision"
  }
  // ...
]
```

## `function filter({ query }: FilterProps): Promise<AnimeInfo[] | null>`
The filter API allows users to filter anime information based on various criteria such as  genre, demography, category, type, state, year, season and orderBy.

## Filter Parameters
### Genre
`['accion', 'aventura', 'autos', ..., 'isekai']`
## Demography
`['nios', 'shoujo', 'shounen', 'seinen', 'josei']`
## Category
`['donghua']`
## Type
`['animes', 'peliculas', 'especiales', 'ovas', 'onas']`
## State
`['emision', 'finalizados', 'estrenos']`
## Year
`['2024', '2023', '2022', ..., '1981']`
## Season
`['invierno', 'primavera', 'verano', 'otoño']`
## OrderBy
`['desc']`

```ts
const response = await filter({
  query: {
    genre: 'sci-fi',
    year: '2024',
  },
})
```
```json
[
  {
    "title": "Kaijuu 8-gou",
    "slug": "kaijuu-8-gou",
    "image": "https://cdn.jkdesu.com/assets/images/animes/image/kaijuu-8-gou.jpg",
    "synopsis": "Unos monstruos grotescos parecidos a Godzilla llamados \"kaijuu\" llevan muchos años apareciendo por Japón. Para combatir a estas bestias, una unidad militar de élite conocida como Cuerpo de Defensa arriesga su vida a diario para proteger a los civiles. Una vez que se mata a una criatura, los \"barrenderos\" -que trabajan bajo las órdenes de la Corporación Profesional de Limpieza de Kaijuu- se encargan de deshacerse de sus restos.\n\nKafka Hibino, un hombre de 32 años, no está satisfecho con su trabajo de barrendero. Desde muy joven ha aspirado a unirse al Cuerpo de Defensa y ganarse la vida matando kaijuus. Sin embargo, tras varios intentos fallidos, renunció a sus sueños y se resignó a la mediocridad que le proporcionaba un sueldo decente. Sin embargo, cuando un ambicioso recluta de 18 años llamado Leno Ichikawa se une a su equipo de limpieza, Kafka vuelve a recordar su deseo de alistarse en el ejército.\n\nTras una cadena de desafortunados acontecimientos y una interacción con el barrendero junior, Kafka se encuentra con un kaijuu de tipo parásito que se abre paso a través de su boca, convirtiéndolo en un monstruo humanoide. Con sus nuevos poderes, Kafka se propone dar una última oportunidad al sueño de su vida.",
    "type": "Anime",
    "episodes": "? Ep"
  },
  {
    "title": "Kuramerukagari",
    "slug": "kuramerukagari",
    "image": "https://cdn.jkdesu.com/assets/images/animes/image/kuramerukagari.jpg",
    "synopsis": "Esta es una historia que une a personas y un pueblo. Una ciudad minera de carbón repleta de excavadoras de pequeña escala, comúnmente conocidas como \"Hakoniwa\". En este pueblo que cambia a diario como un laberinto, hay una chica llamada Kagari que dirige un negocio de elaboración de mapas y un chico llamado Yuya que sueña con liberarse de los \"Hakoniwa\". Finalmente, los dos, junto con los singulares residentes del pueblo, se enfrentan a una conspiración que sacude a todo el pueblo. El destino del “Hakoniwa” depende de los dibujos de Kagari en el mapa.",
    "type": "Pelicula",
    "episodes": "1 Ep"
  }
  // ...
]
```

## `function byAlphabet(letter: string): Promise<AnimeInfo[] | null>`
```ts
const letter = 'A'
const response = await byAlphabet(letter)
```
```json
[
  {
    "slug": "ta-bu-dang-nuzhu-hen-duo-nian",
    "title": "Ta Bu Dang Nuzhu Hen Duo Nian",
    "thumbnail": "https://cdn.jkdesu.com/assets/images/animes/image/ta-bu-dang-nuzhu-hen-duo-nian.jpg",
    "type": "ONA",
    "status": "Concluido"
  },
  {
    "slug": "tabi-machi-late-show",
    "title": "Tabi Machi Late Show",
    "thumbnail": "https://cdn.jkdesu.com/assets/images/animes/image/tabi-machi-late-show.jpg",
    "type": "Anime",
    "status": "Concluido"
  } // ...
]
```

## `function getExtraInfo(animeSlug: string): Promise<RootAnime | null>`
```ts
const animeSlug = 'tokyo-ghoul'
const response = await getExtraInfo(animeSlug)
```
```json
{
  "extra": {
    "type": "Serie",
    "genre": [
      "Psicologico",
      "Sobrenatural",
      "Terror",
      "Drama",
      "Misterio",
      "Accion"
    ],
    "studios": [
      "Studio Pierrot"
    ],
    "demography": [
      "Seinen"
    ],
    "languages": "Japonés",
    "episodeList": [
      {
        "key": "tokyo-ghoul",
        "value": 1
      },
      {
        "key": "tokyo-ghoul",
        "value": 2
      },
      {
        "key": "tokyo-ghoul",
        "value": 3
      },
      {
        "key": "tokyo-ghoul",
        "value": 4
      },
      {
        "key": "tokyo-ghoul",
        "value": 5
      },
      {
        "key": "tokyo-ghoul",
        "value": 6
      },
      {
        "key": "tokyo-ghoul",
        "value": 7
      },
      {
        "key": "tokyo-ghoul",
        "value": 8
      },
      {
        "key": "tokyo-ghoul",
        "value": 9
      },
      {
        "key": "tokyo-ghoul",
        "value": 10
      },
      {
        "key": "tokyo-ghoul",
        "value": 11
      },
      {
        "key": "tokyo-ghoul",
        "value": 12
      }
    ],
    "episodes": 12,
    "duration": "24 min. por episodio",
    "aired": "Jul 3 de 2014 a Ago 18 de 2014",
    "status": "Concluido",
    "quality": "720p",
    "promo": "https://youtube.com/watch?v=vGuQeQsoRgU"
  }
}
```

## `async function top(season: SeasonType, year: YearType): Promise<Anime[] | null>`
*Important: If the ***Temporada Actual*** option is selected the year option will be omitted in the request.*

| SeasonType |      | YearType |      |
|------------|------|----------|------|
| Option     |      | Option   |      |
|------------|------|----------|------|
| `'Primavera'` |      | `'2020'` |      |
| `'Verano'`    |      | `'2021'` |      |
| `'Otoño'`     |      | `'2022'` |      |
| `'Invierno'`  |      | `'2023'` |      |
| `'Temporada Actual'` |  | `'2024'` |  |

```ts
const season = 'Invierno'
const year = '2020'
const response = await top(season, year)
```
```json
[
  {
    "id": null,
    "slug": "shingeki-no-kyojin-the-final-season",
    "title": "Shingeki no Kyojin: The Final Season",
    "synopsis": "Con Eren y compañía ahora en la costa y la amenaza de Marley acechando, ¿que sigue para los Scouts y su búsqueda para desentrañar los misterios de los Titanes, la humanidad y mas?",
    "episodes": 16,
    "image": "https://cdn.jkdesu.com/assets/images/animes/image/shingeki-no-kyojin-the-final-season.jpg",
    "type": "Serie"
  } // ...
]
```

## `async function search(q: string): Promise<SearchResults | null>`
```ts
const q = 'tokyo ghoul'
const response = await search(q)
```

```json
{
  "animes": [
    {
      "id": "1183",
      "slug": "tokyo-ghoul",
      "title": "Tokyo Ghoul",
      "altertitles": [
        {
          "language": "Ingles",
          "title": " Tokyo Ghoul"
        },
        {
          "language": "Sinonimos",
          "title": " Tokyo Kushu, Toukyou Kushu, Toukyou Ghoul"
        },
        {
          "language": "Japones",
          "title": " 東京喰種-トーキョーグール-"
        }
      ],
      "synopsis": "En Tokyo ocurren asesinatos misteriosos cometidos por Ghouls, seres desconocidos que comen carne humana, un día Kaneki Ken un joven de 18 años que cursa la Universidad conoce a una chica en un restaurante y la invita a salir, pero luego se da cuenta que ella es un Ghoul y sufre un ataque de parte de ella, pero afortunadamente sobrevive y la muchacha muere; debido a sus heridas los médicos le hacen un transplante de riñon sin saber que la muchacha era una Ghoul y Kaneki termina convirtiéndose en un ser híbrido humano-ghoul y de ahora en adelante deberá vivir escondiéndose de los humanos.",
      "status": "finished",
      "episodes": "12",
      "image": "https://cdn.jkdesu.com/assets/images/animes/image/tokyo-ghoul.jpg",
      "thumbnail": "https://cdn.jkdesu.com/assets/images/animes/thumbnail/tokyo-ghoul.jpg",
      "type": "TV",
      "rel_id": {
        "Sequel": [
          "1413"
        ],
        "Side story": [
          "1686",
          "1720"
        ]
      },
      "coincidencias": "2"
    } // ...
  ],
  "anime_types": {
    "TV": "Serie",
    "OVA": "OVA",
    "Movie": "Pelicula",
    "Special": "Especial",
    "ONA": "ONA",
    "Music": "Musical"
  }
}
```

## `async function getAnimeServers(animeId: string, chapter: number): Promise<string[] | null>:`
*Important: Keep in mind that it takes about 2 to 3 seconds to return the URLs. The implementation should be improved.*

```ts
const animeSlug = 'tokyo-ghoulre'
const animeChapter = 1
const response = await getAnimeServers(animeSlug, animeChapter)
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

## `async function schedule(): Promise<AnimeDay[]>:`

```ts
const response = await schedule()
```

```json
[
  {
    "day": "monday",
    "animes": [
      {
        "id": "3615",
        "slug": "high-card-season-2",
        "title": "High Card Season 2",
        "image": "https://cdn.jkdesu.com/assets/images/animes/image/high-card-season-2.jpg",
        "lastEpisode": "10",
        "timestamp": "2024-03-11 10:35:34",
        "type": "Serie"
      },
      {
        "id": "3596",
        "slug": "tsuki-ga-michibiku-isekai-douchuu-2nd-season",
        "title": "Tsuki ga Michibiku Isekai Douchuu 2nd Season",
        "image": "https://cdn.jkdesu.com/assets/images/animes/image/tsuki-ga-michibiku-isekai-douchuu-2nd-season.jpg",
        "lastEpisode": "10",
        "timestamp": "2024-03-11 11:42:26",
        "type": "Serie"
      },
      {
        "id": "3638",
        "slug": "synduality-noir-part-2",
        "title": "Synduality: Noir Part 2",
        "image": "https://cdn.jkdesu.com/assets/images/animes/image/synduality-noir-part-2.jpg",
        "lastEpisode": "10",
        "timestamp": "2024-03-11 14:45:09",
        "type": "Serie"
      },
      {
        "id": "3625",
        "slug": "himesama-goumon-no-jikan-desu",
        "title": "Himesama \"Goumon\" no Jikan desu",
        "image": "https://cdn.jkdesu.com/assets/images/animes/image/himesama-goumon-no-jikan-desu.jpg",
        "lastEpisode": "10",
        "timestamp": "2024-03-11 14:45:11",
        "type": "Serie"
      },
      {
        "id": "3604",
        "slug": "dosanko-gal-wa-namara-menkoi",
        "title": "Dosanko Gal wa Namara Menkoi",
        "image": "https://cdn.jkdesu.com/assets/images/animes/image/dosanko-gal-wa-namara-menkoi.jpg",
        "lastEpisode": "10",
        "timestamp": "2024-03-11 14:45:13",
        "type": "Serie"
      },
      {
        "id": "3611",
        "slug": "oroka-na-tenshi-wa-akuma-to-odoru",
        "title": "Oroka na Tenshi wa Akuma to Odoru",
        "image": "https://cdn.jkdesu.com/assets/images/animes/image/oroka-na-tenshi-wa-akuma-to-odoru.jpg",
        "lastEpisode": "10",
        "timestamp": "2024-03-11 14:45:14",
        "type": "Serie"
      }
    ]
  } // ...
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

Copyright ©2024 [jkanime-v2](https://github.com/ChrisMichaelPerezSantiago/jkanime-v2).
