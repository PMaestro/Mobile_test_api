import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CustomDio {
  var _dio;

  CustomDio() {
    _dio = Dio();
  }

  CustomDio.withAuthentication() {
    _dio = Dio();
    _dio.interceptors.add(InterceptorsWrapper(
        onRequest: _onRequest, onResponse: _onResponse, onError: _onError));
  }
  Dio get instance => _dio;

  _onRequest(RequestOptions options) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.get('token');
    options.headers['Authorization'] = token;
  }

  _onResponse(Response e) {
    print('########### Response log #####################');
    print(e.data);
    print('########### Response log #####################');
  }

  _onError(DioError e) {
    return e;
  }
}
