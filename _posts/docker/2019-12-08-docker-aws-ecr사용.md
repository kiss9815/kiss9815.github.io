---
title: "docker image를 aws ecr 에 넣기"
categories:
  - docker
tags:
  - docker linux
last_modified_at: 2019-12-11:00:00+09:00
toc: true
toc_sticky: true
---

## ecr 레포 생성

## ecr 유저 생성
IAM > Users 
Permisiions 은 AmazonEC2ContainerRegistryFullAccess, AmazonEC2ContainerServiceforEC2Role

regions -> ap-northeast-2

## 설치
```
pip install awscli
```

## 로그인 설정

```
root@~~# aws configure 
AWS Access Key ID [None]: YOURACCESSKEY 
AWS Secret Access Key [None]: YOURSECRETKEY 
Default region name [None]: ap-northeast-2 
Default output format [None]: json 
```
```
aws ecr get-login --no-include-email --region ap-northeast-2
```

--no-include-email 을 빼면 오류 발생 
unknown shorthand flag: 'e' in -e  
See 'docker login --help'.  

```
root@~~# docker login -u AWS -p XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -e none https://XYZXYZXYZXYZ.dkr.ecr.us-east-1.amazonaws.com
```

## 도커 태그명 변경
```
root@~~# docker tag ubuntu:latest XYZXYZXYZXYZ.dkr.ecr.us-east-1.amazonaws.com/repo-test:latest
``` 
```
docker tag [repo이름:tag명] [바꿀repo이름:tag명] 
```

## 도커 push
```
root@~~# docker push XYZXYZXYZXYZ.dkr.ecr.us-east-1.amazonaws.com/repo-test:latest
```
```
docker push [repo이름:tag명]
```



참고문헌
> https://bluese05.tistory.com/51 [aws-ecr시작]]
