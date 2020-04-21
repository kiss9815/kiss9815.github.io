
# docker-compose 로 mysql 올리기  

```yml
version: '3.5'

services:
  db:
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    ports:
    - "3306:3306"
    volumes:
        - ./db/mysql_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
    # networks:
    #   devnet:
    #     ipv4_address: 172.19.0.10

  adminer:
    image: adminer
    restart: always
    ports:
    - "13306:13306"
    # networks:
    #   devnet:
    #     ipv4_address: 172.19.0.11

# networks:
#   devnet:
#     external:
#       name: devnet
```

docker-compose.yml 이라는 파일로 만들고 해당경로에서   
명령어 docker-compose up 으로 실행  

docker-compose stop  내리기  
docker-compose ps 실행중인 docker컴포즈 확인    


참고문헌
> https://ggami.net/429/docker-mysql-volume-mount-%ED%95%98%EA%B8%B0/ [volume설정]
