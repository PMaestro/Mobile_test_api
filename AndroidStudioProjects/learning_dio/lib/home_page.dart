import 'package:flutter/material.dart';
import 'package:learningdio/model/contato.dart';
import 'package:learningdio/repository/contatos_repository.dart';
import 'package:learningdio/repository/login_repository.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Future<List<ContatoModel>> contatoFuture;
  ContatosRepository _repository;

  void initState() {
    super.initState();
    LoginRepository().login();
    _repository = ContatosRepository();
    contatoFuture = _repository.findAll();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Aprendendo DIO"),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextFormField(
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
              ),
              Container(
                  child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: RaisedButton(
                  child: Text('buscar'),
                  onPressed: () {},
                ),
              )),
            ],
          ),
          Expanded(
            child: ListView(
              children: <Widget>[],
            ),
          )
        ],
      ),
    );
  }
}
