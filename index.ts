import * as crypto from 'crypto';

//Transfer środków między dwoma portfelami
class Transaction {
  constructor(
    public amount: number, 
    public payer: string, //klucz publiczny
    public payee: string //klucz publiczny
  ) {}

  toString() {
    return JSON.stringify(this);
  }
}

//Pojedynczy blok w łańcuchu
class Block {

  public nonce = Math.round(Math.random() * 999999999);

  constructor(
    public prevHash: string, 
    public transaction: Transaction, 
    public timeStamp = Date.now()
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}


//Łańcuch bloków
class Chain {
  //Instancja singleton
  public static instance = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [
      //Blok początkowy
      new Block('', new Transaction(100, 'patryk', 'piotr'))
    ];
  }

  //Najnowszy blok
  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  //Dowód pracą
  mine(nonce: number) {
    let solution = 1;
    console.log('⛏️  mining...')

    while(true) {

      const hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();
      const attempt = hash.digest('hex');

      //TODO dodaj weryfijację rozwiązania, która polega na sprawdzeniu czy otrzymany 
      //hash rozpoczyna się od czterech zer 
      if(TODO){
        console.log(`Solved: ${solution}`);
        return solution;
      }

      solution += 1;
    }
  }

  //Dodaj nowy blok do łańcucha jeżeli sygnatura jest prawidłowa oraz dowód pracą zostanie zakończony
  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
    const verify = crypto.createVerify('SHA256');
    verify.update(transaction.toString());

    const isValid = verify.verify(senderPublicKey, signature);

    if (isValid) {
      //TODO utwórz nowy blok wykorzystyjąc hash poprzedniego bloku oraz aktualną transakcje 
      // rozpocznij procedurę kopania i następnie dodaj blok do łańcucha
    }
  }

}

//Portfel, w którym przypisujemy użytkownikowi klucz prywatny oraz publiczny
class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    //TOOD wygeneruj klucz publiczny oraz prywatny wykorzystując odpowiednią funkcję z bibliteki crypto oraz algorytm RSA
    //klucze mają mieć długość 2048 bitów, klucz publiczny ma być typu spki a prywatny typu pkcs8 oraz obydwa klucze mają mieć format pem
    const keypair = 

    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

    //TODO utwórz podpis wykorzystując odpowiednią metodę z biblioteki crypto oraz algorytm SHA256
    const sign = 
    sign.update(transaction.toString()).end();

    const signature = sign.sign(this.privateKey); 
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}

//Przykładowe transkacje
const piotr = new Wallet();
const patryk = new Wallet();

piotr.sendMoney(112, patryk.publicKey);
patryk.sendMoney(997, piotr.publicKey);

//TODO Dodaj swój portfel oraz wykonaj przykładowe transkacje


//Wizualizacja łańcucha bloków
Chain.instance.chain.forEach(element => {
  console.log(element);
});
