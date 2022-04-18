# { Curlybrackets }

## 배포링크 
- https://iwipwq-nest.herokuapp.com

## { Curlybrackets } 은 블로그 웹 앱 서비스입니다.
- 누구나 자유롭게 글을 열람 할 수 있습니다.
- 회원가입 후 로그인해서 출판이 가능합니다.
- 오늘 먹은 점심, 내가 좋아하는것, 그 밖의 자유로운 주제로 글을 쓰고 사진과 함께 출판 할 수 있습니다.
- 

## 사용된 기술
- 프론트엔드 : React / React-Router v6 / Sass / axios
- 서버 API : Node.js / express.js / MongoDB / mongoose / multer

## 배포 및 버전관리
heroku / github

## API 명세서

<details>
<summary> 펼쳐보기 </summary>

### 0.요청 URL
https://iwipwq-nest.herokuapp.com/api

### 1. 회원가입

API
```
POST /register
```
Req
```
{
    username: String,
    email: String,
    password: String,
} 
```
Res
```JSON
{   
    biography: String,
    createdAt: String,
    email: String,
    profileImg: String,
    updatedAt: String,
    username: String,
    __v: 0,
    _id: String,
}
```
### 2. 로그인

API
```
POST /login
```
Req
```JSON
{
    username: String,
    password: String,
} 
```
Res
```JSON
{
    biography: String,
    createdAt: String,
    email: String,
    profileImg: String, //(filename + Date.now())
    updatedAt: String,
    username: String,
    __v: Number,
    _id: String
}
```

### 3. 회원정보 (계정관리)

#### 3-1. 회원정보 가져오기
API
```
GET /user/:UserId
```
Res
```
{
    biography: String,
    createdAt: String,
    email: String,
    profileImg: String, //(filename + Date.now())
    updatedAt: String,
    username: String,
    __v: Number,
    _id: String
}
```

#### 3-2. 회원정보 수정
API
```
PUT /user/:userId
```
Req
```JSON
{        
    userId: String,
    username: String,
    email: String,
    password: String,
    biography: String,
    profileImg: String,
}

```
Res
```
{
    biography: String,
    createdAt: String,
    email: String,
    profileImg: String, //(filename + Date.now())
    updatedAt: String,
    username: String,
    __v: Number,
    _id: String
}

```
#### 3-2. 계정 삭제
API
```
DELETE /user/:userId
```
Req
```
{
    data: {
        userId: String,
        password: String,
    }
}
```
Res
```
{
    biography: String,
    createdAt: String,
    email: String,
    profileImg: String,
    updatedAt: String,
    username: String,
    __v: Number,
    _id: String
}
```

### 4. 포스트 정보 가져오기

#### 4-1. 특정 포스트 가져오기
API
```
GET /post/:postId
```

Res
```JSON
{   
    categories: [Array],
    createdAt: String,
    desc: String,
    title: String,
    updatedAt: String,
    username: String,
    __v: Number,
    _id: String
},
```

#### 4-2. 특정 유저의 포스트 가져오기
API
```
GET /post/:userId
```
Res
```JSON
{
        {   //첫번째 포스트 (data[0])
        categories: [Array]
        createdAt: String
        desc: String
        title: String
        updatedAt: String
        username: String
        __v: 0
        _id: String
    },

    //...
    //...

    {   //마지막 포스트 (data[data.length - 1])
        categories: [Array]
        createdAt: String
        desc: String
        title: String
        updatedAt: String
        username: String
        __v: 0
        _id: String
    },
}
```

#### 4-3. 모든 포스트 정보 가져오기
API

```
GET /post
```

Res
```json
[
    {   //첫번째 포스트 (data[0])
        categories: [Array]
        createdAt: String
        desc: String
        title: String
        updatedAt: String
        username: String
        __v: 0
        _id: String
    },

    //...
    //...

    {   //마지막 포스트 (data[data.length - 1])
        categories: [Array]
        createdAt: String
        desc: String
        title: String
        updatedAt: String
        username: String
        __v: 0
        _id: String
    },
]
```

### 5. 카테고리

#### 5-1. 카테고리 가져오기
API
```
GET /category
```
res
```JSON
{
    name: String,
    updatedAt: String,
}
```

#### 5-1. 카테고리 추가하기
API
```
GET /category
```
req
```JSON
{
    name: String,
}
```
res
```JSON
{
    name: String,
    updatedAt: String,
}
```
</details>