
# docker 로 postgress

```
docker run --name pgsql -d -p 5432:5432 -e POSTGRES_PASSWORD=postgrespassword postgres
```
계정 postgress
비번 postgrespassword

참고문헌
> https://romeoh.tistory.com/entry/Postgresql-Docker%EC%97%90-Postgresql-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0 [postgress설치]
