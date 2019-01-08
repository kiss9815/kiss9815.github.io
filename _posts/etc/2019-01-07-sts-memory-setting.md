---
title: "sts-setting out of memory"
excerpt: "sts.ini 의 memory 설정 out of memory"
categories:
  - pending
tags:
  - sts-setting
last_modified_at: 2019-01-03T13:00:00+09:00
toc: true
toc_sticky: true
---
sts.ini 의 memory 설정 out of memory

이클립스가 설치된 폴더에 보면 STS.ini 라는 파일이 있다 (이클립스의 경우는 eclipse.ini 이다.)

해당하는 파일을 열어보면 열러가지 STS 혹은 이클립스에 관련된 설정을 볼 수 있다.

주요 내용은 아래와 같다.(다른 곳의 내용을 참조하기도 함)

1) -Dosgi.requiredJavaVersion=1.6​
      ==> 현재 사용할 자바 버전
2) -vm c:\test\java\jdk1639\bin\javaw.exe​
    ==> 자바 파일의 위치
3) -Xverify:none
    ==> 초기 실행시 클래스의 유효성 검사 생략 설정
    초기 시동시 verfify체크를 하지 않는다. 당연히 시동이 빨라진다. 플러그인의 features에 문제가 발생 할 수 있는데 플러그인에 변경 사항이 있을 경우에는 이걸 키고 시동하고, 별 문제 없으면 추가해서 사용한다.
4) -XX:+UseParallelGC
    ==> 병렬 가비지 컬렉션 사용. (병렬 처리로 속도 향상)
    Parallel Collector를 사용 하도록 한다. 체감 속도가 올라간다. 다중 프로세서를 사용한다면 필수.
5) -XX:+AggressiveOpts
    ==> 컴파일러의 소수점 최적화 기능을 작동시켜 빨라진다.
6) -XX:-UseConcMarkSweepGC
    ==> 병행 Mark-Sweep GC 수행하여 이클립스 GUI의 응답 최적화 설정
7) -XX:+CMSIncrementalMode=true
    ==> 점진적인 GC 설정
**8) -Xms512m**
    ==> 이클립스가 사용하는 최소 Heap 메모리
**9) -Xmx512m**
    ==> 이클립스가 사용하는 최대 Heap 메모리 - 최소와 최대를 같은 값으로 설정하면
          힙메모리 영역의 변경이 없어 속도 향상
10) -XX:PermSize=128m
      ==> Permanent Generation(JVM 클래스와 메서드를 위한 공간) 의 크기

-XX:MaxPermSize=128m (Permanent Generation(JVM 클래스와 메서드를 위한 공간)의 최대 크기 설정 ? Out Of Memory Error가 자주 발생하면 이 부분을 늘려 해결할 수 있음)
-XX:NewSize=128m (New Generation(새로 생성된 객체들을 위한 공간)의 기본 크기)
-XX:MaxNewSize=128m (New Generation(새로 생성된 객체들을 위한 공간)의 최대 크기)

[메모리 정의 예]
1기가 이하 메모리인 컴퓨터인 경우 : -Xms256m -Xmx256m
2기가 ~ 3기가 메모리인 컴퓨터 : -Xms512m -Xmx512m
4기가 이상 메모리인 컴퓨터 : -Xms1024m -Xmx1024m
[ 메모리 설명 ]
JVM 은 3가지 메모리 영역을 관리한다
1. Permanent(영구) 영역 : JVM 클래스와 메소드를 위한 공간. = PermSize 설정
2. New/Young 영역 : 새로 생성된 개체들을 위한 공간. = NewSize 설정
3. Old 영역 : 만들어진지 오래된 객체들의 공간.(New 영역에서 이동해 온다)
