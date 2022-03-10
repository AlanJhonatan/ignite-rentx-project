class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    console.log('import useCase', file);
  }
}

export { ImportCategoryUseCase };
