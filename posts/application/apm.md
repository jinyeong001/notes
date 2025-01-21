# APM (Apache, PHP, MySQL) 설치
---

해당 포스트의 과정은 RedHat 계열의 리눅스 서버(Rocky Linux)에서 진행되었습니다.

## APM이란?
APM은 웹 서버를 구축하기 위한 기본적인 소프트웨어 스택으로, 다음 세 가지 주요 구성요소로 이루어져 있다.
- **Apache**: 세계에서 가장 널리 사용되는 웹 서버 소프트웨어
- **PHP**: 서버 사이드 스크립팅 언어
- **MySQL/MariaDB**: 관계형 데이터베이스 관리 시스템
<br>

## 1. Apache 웹 서버

### Apache란?
Apache HTTP Server는 오픈 소스 웹 서버 소프트웨어로, 전 세계 웹 서버의 큰 비중을 차지하고 있다.<br>
안정성과 다양한 기능을 제공하며, 모듈 기반 구조로 확장성이 뛰어나다.
<br>

### Apache 설치 및 설정
```bash
# Apache 설치
$ dnf install -y httpd

# 서비스 시작 및 자동 시작 설정
$ systemctl start httpd
$ systemctl enable httpd

# 방화벽 설정
$ firewall-cmd --permanent --add-service=http
$ firewall-cmd --reload

# 서비스 상태 확인
$ systemctl status httpd
```
<br>

### 웹 페이지 생성
기본 문서 루트: `/var/www/html`
```html
# /var/www/html/index.html 생성
<html>
<body>
    <h1>Welcome to my web server!</h1>
</body>
</html>
```
<br><br>

## 2. PHP

### PHP란?
PHP(PHP: Hypertext Preprocessor)는 서버 사이드 스크립팅 언어로, HTML에 임베드되어 동적 웹 페이지를 생성할 수 있다.<br>
HTML과 달리 서버에서 실행되어 데이터베이스 연동, 파일 처리 등 다양한 서버 측 기능을 제공한다.
<br>

### PHP 설치 및 테스트
```bash
# PHP 설치
$ dnf install -y php php-mysqlnd

# Apache 재시작
$ systemctl restart httpd
```
<br>

### PHP 테스트 페이지
```php
# /var/www/html/info.php
<?php
    phpinfo();
?>
```
<br>

### HTML vs PHP 예제
```php
# /var/www/html/example.php
<!DOCTYPE html>
<html>
<body>
    <!-- HTML 부분 -->
    <h1>정적 콘텐츠</h1>
    
    <!-- PHP 부분 -->
    <?php
        $time = date("Y-m-d H:i:s");
        echo "<p>현재 시간: $time</p>";
        
        // 간단한 계산
        $a = 5;
        $b = 3;
        echo "<p>$a + $b = " . ($a + $b) . "</p>";
    ?>
</body>
</html>
```
<br><br>

## 3. MySQL (MariaDB)

### MariaDB란?
MariaDB는 MySQL의 대체 데이터베이스로, MySQL과 완벽한 호환성을 제공하는 오픈소스 관계형 데이터베이스이다.
<br>

### MariaDB 설치 및 초기 설정
```bash
# MariaDB 설치
$ dnf install -y mariadb-server

# 서비스 시작 및 자동 시작 설정
$ systemctl start mariadb
$ systemctl enable mariadb

# 초기 보안 설정
$ mysql_secure_installation
```
<br>

### 기본 보안 설정 과정
1. root 비밀번호 설정
2. 익명 사용자 제거
3. 원격 root 로그인 비활성화
4. test 데이터베이스 제거
5. 권한 테이블 재로드
<br>

### 데이터베이스 접속
```bash
$ mysql -u root -p
```
<br>

### 기본 데이터베이스 명령어
```sql
# 데이터베이스 생성
$ CREATE DATABASE mydb;

# 사용자 생성 및 권한 부여
$ CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'password';
$ GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost';
$ FLUSH PRIVILEGES;
```
<br>

더 자세한 명령어는 [MySQL 페이지](?MySQL)를 참고하세요.
<br><br>

## 작동 확인
1. Apache: 브라우저에서 `http://서버IP` 접속
2. PHP: 브라우저에서 `http://서버IP/info.php` 접속
3. MariaDB: 터미널에서 `mysql -u root -p` 로 접속

