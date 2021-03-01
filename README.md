# Documentation

API PATH: https://catchtheshow.herokuapp.com/api/documentation

---
### Search Show

```catchtheshow.herokuapp.com/api/search?name=```

Live Response: https://catchtheshow.herokuapp.com/api/search?name=school+day

<details><summary> Example Response </summary>
<p>

```
[
  {
   "name": "School Days",
   "id": "/school-days",
   "description": "School has always been something that most people dislike, though such is absolutely true for Makoto Ito. However, when he meets a beautiful girl on the train ride to school, and realizes that she goes to the same school as him, he earns some incentive to keep his attendance rate up. Unfortunately for him, the girl, whose name is Kotonoha Katsura, doesn't seem to be too interested in him. Makoto Ito must now find a way to woo the girl of his dreams, though he doesn't know how complicating his life is about to become.",
   "imageUrl": "//static.next-episode.net/tv-shows-images/big/school-days.jpg",
   "rating": 4.5
  }
]
```

</p>
</details>

---
### Charts

```catchtheshow.herokuapp.com/api/charts/:type```

Live Response: https://catchtheshow.herokuapp.com/api/charts/hot

<details><summary> Example Response </summary>
<p>

```
[
  {
   "name": "WandaVision",
   "id": "/wandavision",
   "description": "Blends the style of classic sitcoms with the MCU in which Wanda Maximoff and Vision - two super-powered beings living their ideal suburban lives - begin to suspect that everything is not as it seems.",
   "imageUrl": "//static.next-episode.net/tv-shows-images/big/wandavision.jpg",
   "rating": 3.6
  }
]
```

</p>
</details>

---
### Show Information

```catchtheshow.herokuapp.com/api/:id```

Live Response: https://catchtheshow.herokuapp.com/api/this-is-us

<details><summary> Example Response </summary>
<p>

```
{
 "name": "This is Us",
 "description": "Sometimes life will surprise you. Starring Mandy Moore (\"A Walk to Remember\"), Milo Ventimiglia (\"Heroes,\" \"Gilmore Girls\") and Sterling K. Brown (\"The People V. O.J. Simpson: American Crime Story),\" this refreshingly honest and provocative series follows a unique ensemble whose paths cross and their life stories intertwine in curious ways. We find several of them share the same birthday, and so much more than anyone would expect. From the writer and directors of \"Crazy, Stupid, Love.\" comes a smart, modern dramedy that will challenge your everyday presumptions about the people you think you know.",
 "imageUrl": "//static.next-episode.net/tv-shows-images/huge/this-is-us.jpg",
 "rating": 4.54,
 "creators": [
  "Dan Fogelman"
 ],
 "runtime": "60 min",
 "status": "Running",
 "previousEpisode": {
  "name": "The Ride",
  "episode": 9,
  "season": 5,
  "date": {
   "day": 23,
   "month": 2,
   "year": 2021
  }
 },
 "nextEpisode": {
  "name": "I've Got This",
  "countdown": "1 week, 1 day",
  "episode": 10,
  "season": 5,
  "date": {
   "day": 9,
   "month": 3,
   "year": 2021
  }
 }
}
```

</p>
</details>

---
### Get Cast Information

```catchtheshow.herokuapp.com/api/:id/cast```

Live Response: https://catchtheshow.herokuapp.com/api/the-lord-of-the-rings/cast

<details><summary> Example Response </summary>
<p>

```
[
 {
  "name": "Markella Kavenagh",
  "imageUrl": "https://static.next-episode.net/actor-images/actors/05/markella-kavenagh.jpg",
  "role": "Tyra"
 },
 {
  "name": "Will Poulter",
  "imageUrl": "https://static.next-episode.net/actor-images/actors/06/will-poulter.jpg",
  "role": "Beldor"
 },
 {
  "name": "Joseph Mawle",
  "imageUrl": "https://static.next-episode.net/actor-images/actors/07/joseph-mawle.jpg",
  "role": "Oren"
 },
 {
  "name": "Morfydd Clark",
  "imageUrl": "https://static.next-episode.net/actor-images/actors/08/morfydd-clark.jpg",
  "role": "Galadriel"
 }
]
```

</p>
</details>

---
### Get Season Information

```catchtheshow.herokuapp.com/api/:id/:season```

Live Response: https://catchtheshow.herokuapp.com/api/chernobyl/1

<details><summary> Example Response </summary>
<p>

```
[
  {
  "name": "Please Remain Calm",
  "date": {
   "day": 13,
   "month": 5,
   "year": 2019
  }
]
```

</p>
</details>

---
### Get Episode Information

```catchtheshow.herokuapp.com/api/:id/:season/:episode```

Live Response: https://catchtheshow.herokuapp.com/api/chernobyl/1/4

<details><summary> Example Response </summary>
<p>

```
{
 "name": "The Happiness of All Mankind",
 "date": {
  "day": 27,
  "month": 5,
  "year": 2019
 }
}
```

</p>
</details>
