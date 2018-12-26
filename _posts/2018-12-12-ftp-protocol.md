---
title: "FTP 보안 프로토콜"
excerpt: "FTP 보안 프로토콜"
categories:
  - blogging
tags:
  - ftp, web
last_modified_at: 2018-12-2201T13:00:00+09:00
toc: true
toc_sticky: true
---

FTP 보안 프로토콜(SFTP, Secure FTP, FTPS)

# 1. SFTP(SSH File Transfer Protocol)

    정확히 말하면 SFTP 프로토콜은 FTP를 사용하지 않는다. SFTP는 SSH 기반의 새로운 파일 전송 프로토콜이다. SSH 서버가 구축되어 있어야 한다. Telnet을 대체하는 원격관리 프로토콜인 SSH를 이용하기 때문에 구축 및 유지 비용이 적고 다른 보안 FTP 메커니즘에 비해 일반 사용자들이 사용하기에 편리하여 많이 사용된다.

    일반 사용자들은 FileZilla, SSH Secure Shell v3.29 또는 pscp, WinSCP 프로그램을 이용한다. 상용S/W로는 VanDyke Software 社에서 나온 SecureFX가 있다.

    특히 FileZilla는 Open S/W이고 아래에서 소개한 FTPS(FTP over SSL)까지 지원하기 때문에 추천한다.


# 2. FTP over SSH(Secure FTP)
    SSH 연결 위에 일반 FTP로 터널링 연결을 함으로써 접속 시에 계정 정보가 암호화 되어 악의적인 공격자에게 노출되지 않지만 데이터는 암호화 되지 않는다.

    이 방법은 ssh를 이용하여 터널링을 구성한 다음, 일반 ftp로 접속하는 방법이기 때문에 일반 사용자들이 사용하기에는 쉽지 않다.

    * SSH(Secure Shell)
  원격 컴퓨터에 안전하게 액세스하기 위한 유닉스 기반의 명령 인터페이스 및 프로토콜
  강력한 암호화 기능을 구현해 모든 데이터가 암호화 되기에 높은 보안을 지원

# 3. FTPS(FTP over SSL)
    FTP가 TLS/SSL 보안 연결에서 동작한다. TLS(Transport Layer Security)/SSL(Secure     Sockets Layer)

    FTP Secure 또는 FTP-SSL로 알려진 FTPS는 TLS(Transport Layer Security)와 Secure Sockets Layer (SSL) 암호화 프로토콜이 더해진 FTP의 확장판이다. SSL 레이어 위에서 FTP를 수행하는 것으로서 command 와 data 모두 암호화 된다.

# 4. FTP

    FTP는 21포트(TCP 21)를 사용하고, SFTP는 22포트를 사용하죠. 21 포트를 이용한 FTP접속은 로그인 정보를 평문으로 전송하기 때문에 보안에 취약하다.  SFTP는 이름 그대로 이러한 점을 보완한  Secure FTP로, 보다 안전한 호스팅 서비스를 이용하기 위해서는 SFTP를 사용한다.
