import 'package:learningdio/util/custom_dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginRepository {
  login() {
    var dio = CustomDio().instance;

    dio.post("http://localhost:1337/login",
        data: {"username": "eric", "password": "test"}).then((res) async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('token', res.data['token']);
    }).catchError((err) {
      throw Exception('Login ou Senha inválidos');
    });
  }
}
