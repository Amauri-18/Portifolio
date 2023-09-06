#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <string.h>
#include <dirent.h>
#include <unistd.h>
#include <windows.h>

// ------------------------------------------------------------------------------------------------------------------------------

void createFolder(const char *folderName[], const char *fileName[], char caminho[]) {
    
    // Define o tamanho de caractere que a variavel ira receber
    char newBufferPath[100];
    char currentPath[100];
    char newFolder[100];

    snprintf(newFolder, sizeof(newFolder), "%s%s%s", caminho, "/", *folderName);
    snprintf(newBufferPath, sizeof(newBufferPath), "%s%s%s%s%s",caminho, "/", *folderName, "/", *fileName);
    snprintf(currentPath, sizeof(currentPath), "%s%s%s", caminho, "/", *fileName);

    // Imprime o caminho onde as pastas serao criadas
    printf("\n-------------------------------------------------------------------------------------");
    printf("\n=> Current path: %s",currentPath);
    printf("\n=> New path: %s",newBufferPath);
    printf("\n=> New Folder: %s",newFolder);
    printf("\n-------------------------------------------------------------------------------------");

    // Verifica se a pasta já existe
    if(access(newFolder, F_OK) != -1) {
        printf("\n=> This folder already exists!");               
        
        //Move o arquivo para o novo destino
        if(MoveFile(currentPath, newBufferPath)) {
            printf("\n=> File moved succesfully: %s", newBufferPath);
        } else {
            perror("\n=> Error while moving the file.");
        }

    } else {
        // Cria a pasta com o nome e caminho do arquivo
        if(CreateDirectory(newFolder, NULL) != 0) {
            printf("\n=> Folder created succesfully!");
        
            // Move o arquivo para o novo destino
            if(MoveFile(currentPath, newBufferPath)) {
                printf("\n=> File moved successfully: %s", newBufferPath);
            } else {
                perror("\n=> Error while moving file.");
            }

        } else {
            perror("\n=> Error while creating new folder!");
        }                                              
    }
}
// ------------------------------------------------------------------------------------------------------------------------------

int dots_count(const char *fileName[]) {

    int i = 0;
    int dots = 0;
    const char *aux = *fileName;

    while(*aux != '\0') {
        if(*aux == '.') {
            dots++;
        }
        aux++;    
    }

    return dots;
}
// ------------------------------------------------------------------------------------------------------------------------------

char set_fileName(int dots, const char *fileName[], char caminho[]) {
 
    int i = 0, index = 1;   
    const char *nome = *fileName;
    char caracter[100] = {""};

    char currentBuffer[100];
    char newBuffer[100];   

    while(*nome != '\0') {      

        if(*nome != '.') {
            caracter[i] = *nome;
            i++;
        } else {                                                   
            
            if(index == dots) {
                caracter[i] = '.';
            } else {
                caracter[i] = '-';
            }    
            index++;       
            i++;
        }
        nome++;
    }  

    const char *path = caminho;
    const char *currentName = *fileName;
    const char *newName = caracter;

    snprintf(currentBuffer, sizeof(currentBuffer), "%s%s%s", path,"/", currentName);
    snprintf(newBuffer, sizeof(newBuffer), "%s%s%s", path, "/", newName);

    printf("\n=> Folder name => %s", caminho);
    printf("\n=> Current name: %s", currentBuffer);
    printf("\n=> New name: %s", newBuffer);
       
    if(rename(currentBuffer, newBuffer) == 0) {
        printf("\n=> File renamed successfully.\n");
    } else {
        perror("\n=> Error while renaming file.\n");
    }  
}

// ------------------------------------------------------------------------------------------------------------------------------
void rename_file(char caminho[]) {

    DIR *diretorio;
    struct dirent *entrada;    
    int files = 0;

    // Abre a pasta
    diretorio = opendir(caminho);

    // Verifica se houve sucesso na abertura da pasta
    if(diretorio == NULL) {
        perror("\n=> Error while opening folder");
    }
    
    while((entrada = readdir(diretorio)) != NULL) {
        if(entrada->d_type == DT_REG) {
            //Atribui o nome do arquivo
            const char *original = entrada->d_name;

            //Conta a quantidade de pontos
            int dots = dots_count(&original);  

            //Set file name             
            set_fileName(dots, &original, caminho);     
            files++;
        }
    }
    closedir(diretorio);
}
// ------------------------------------------------------------------------------------------------------------------------------

int main() {
    
    DIR *directory;
    struct dirent *entry;

    // Atribui o caminho da pasta
    char caminho[100];
    int choice = 0, i = 0;

    do {
        printf("\nEnter target path: ");
        scanf("%s", caminho);

        printf("\n\tTarget path: %s", caminho);
        printf("\n\n\tIs the target path corret?");
        printf("\n\t0 - No");
        printf("\n\t1 - Yes");
        printf("\n\n\tEnter to continue: ");
        scanf("%d", &choice);
    } while(choice == 0);

    rename_file(caminho);

    // Atribui o path na variavel
    directory = opendir(caminho);    

    // Verifica se o caminho está correto
    if(directory == NULL) {
        perror("\n\tError opening directory");
        return 1;
    }    
    
    printf("\n=> Opening folder...\n");

    while((entry = readdir(directory)) != NULL) {

        // Check if it's a regular file
        if(entry->d_type == DT_REG) {           

            // Atribui o nome do arquivo
            const char *fileName = entry->d_name;
            const char *fileNameAux = entry->d_name;     
                        
            const char *lastDot = strchr(fileName, '.');            
        
            // Verifica se existe o ponto
            if(lastDot != NULL && lastDot != fileName + strlen(fileName) -1) {
                // Remove o ponto da extensao
                const char *extension = lastDot + 1;
                
                // Atribui o nnome da pasta                  
                const char *folderName = extension;            
              
                // Call function createFolder  
                createFolder(&folderName, &fileName, caminho);                     
            }             
            i++;
        }
        
    }

    i == 0 ? printf("\n=> Empty folder.\n") : printf("\n=> Number os files: %d\n", i);

    // Fecha a pasta atual
    closedir(directory);
    
    printf("\nFolder closed...\n");

    return 0;
}