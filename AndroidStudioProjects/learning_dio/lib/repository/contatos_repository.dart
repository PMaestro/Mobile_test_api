import 'package:learningdio/model/contato.dart';
import 'package:learningdio/util/custom_dio.dart';

class ContatosRepository {
  Future<List<ContatoModel>> findAll() {
    var dio = CustomDio.withAuthentication().instance;
    dio.get('http://localhost:1337/contatos').then(
      (res) {
        return res.data.map<ContatoModel>(ContatoModel.fromMap).toList();
      },
    );
  }
}
