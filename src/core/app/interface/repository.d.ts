namespace Repository {
  interface Boleto {
    create(data: Boletos): Promise<void>
  }
}
