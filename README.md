First Commit - Branch dev


## Command deploy : 

```bash
##follow the movement of containers and images
lazydpocker
```

```bash
##Authorize file script excute
sudo chmod +x fetch-and-deploy-dev.sh
sudo chmod +x fetch-and-deploy-main.sh
```

## Docker Clear : 

### 1. Arrêter tous les conteneurs Docker en cours d'exécution :
```bash
docker stop $(docker ps -aq)
```
### 2. Supprimer tous les conteneurs Docker :
```bash
docker rm $(docker ps -aq)
```
### 3. Supprimer toutes les images Docker :
```bash
docker rmi $(docker images -q)
```
### 4. Supprimer tous les volumes Docker inutilisés :
```bash
docker volume prune
```
### 5. Supprimer tous les réseaux Docker inutilisés :
```bash
docker network prune
```
### 6. Supprimer tous les systèmes de fichiers de construction Docker inutilisés :
```bash
docker builder prune
```