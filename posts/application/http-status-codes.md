# http-status-codes
---

## 1XX - information : 정보 제공
100 - Continue : 계속<br>
101 - Switching Protocol : 프로토콜 전환<br>
102 - Processing - 처리중<br>
103~199 - Unssigned : 현재 할당되지 않음
<br><br>

## 2XX - Success : 성공
200 - OK : 성공<br>
201 - Created : 생성됨<br>
202 - Accepted : 허용됨(요청은 접수, 처리 완료 X)<br>
203 - Non-Authentication Information : 신뢰할 수 없는 정보<br>
204 - No Content : 콘텐츠 없음<br>
205 - Reset Content : 콘텐츠 재설정<br>
206 - Partial Content : 일부 콘텐츠<br>
207 - Multi Status : 다중 상태
208~299
<br><br>

## 3XX - Redirection : 추가적인 동작 필요
300 - Multiple Choices : 여러 선택항목<br>
301 - Moved Permanently : 영구 이동<br>
302 - Found : 다른 위치 찾음<br>
303 - See Other : 다른 위치 보기<br>
304 - Not Modified : 수정되지 않음, 페이지 갱신 X<br>
305 - Use Proxy : 프록시 사용<br>
306 - Unused : 예전 버전에서는 사용했으나 현재는 사용안함<br>
307 - Temporary Redirect : 임시 리다이렉션<br>
308~399 - Unssigned
<br><br>

## 4XX - Client Error
400 - Bad Request : 잘못된 요청<br>
401 - Unauthentication : 권한 없음<br>
402 - Payment Required : 결제 필요<br>
403 - Forbidden : 금지됨<br>
404 - Not Found : 찾을 수 없음<br>
405 - Method Not Allowed : 허용되지 않은 메소드<br>
406 - Not Acceptable : 수용할 수 없음<br>
407 - Proxy Authentication Required : 프록시 서버에 인증 필요<br>
408 - Request Timeout : 요청 시간 초과<br>
409-417 - Unssigned<br>
418-421 - Unssigned<br>
422-429 - Unssigned<br>
431, 444, 451 - Unssigned<br>
452-499 - Unssigend
<br><br>

## 5XX - Server Error
500 - Internal Server Error : 내부 서버 오류<br>
501 - Not Implemented : 구현되지 않음<br>
502 - Bad Gateway : 불량 게이트웨이<br>
503 - Service Unavailable : 서비스 제공 불가<br>
504 - Gateway Timeout : 게이트웨이 시간 초과<br>
505 - HTTP Version Not Supported : HTTP 버전 미지원<br>
506 - Unssigned<br>
507 - Insuffcient Stroage : 용량 부족<br>
512~599 : Unssigned