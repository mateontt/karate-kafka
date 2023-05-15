<h1 align="center">Automatización Communications</h1>

<p align="center">
  <img src="https://img.shields.io/badge/-COMMUNICATIONS-blue" alt="COMMUNICATIONS">
  <img src="https://img.shields.io/badge/-Karate-green" alt="Karate">
<p>

<p align="center">
  <a href="#descripción">Descripción</a> •
  <a href="#estructura">Estructura</a> •
  <a href="#comandos">Comandos</a> •
  <a href="#workflow">Workflow</a>
</p>

<hr>

<br>

# Descripción
Proyecto de automatización para los tests de Communications

# Estructura
La estructura de carpeta es similar a la de cualquier otro dominio dentro de este proyecto. Estas serían las rutas:

* ```./code/DIGITALTIENDA/COMMBRANDS```: Raíz del proyecto para Communications. Desde aquí se lanzará el comando MVN en caso de lanzarla de forma manual
* ```./github/workflows/utils```: Scripts de GitHub Workflows
* ```./github/workflows/utils/communications```: Scripts python para las GitHub Action
* ```./code/DIGITALTIENDA/COMMBRANDS/src/test/resources/test-cases```: Ruta donde se deben dejar los ficheros **.feature** con los tests para ser ejecutados
* ```./code/DIGITALTIENDA/COMMBRANDS/target/karate-reports```: Ruta donde se guardará el reporte que haya generado Karate para la última ejecución


# Comandos
> **Info**
> Los comandos MVN se tiene que ejecutar desde la carpeta donde se encuentre el fichero pom.xml
> Los scripts de Python se tiene que ejecutar desde la carpeta donde se encuentren. Algunos scripts tienen una versión **_local** para que puedan ser lanzados desde la propia máquina y así poder realizar pruebas en local.
> Ver <a href="#estructura">Estructura</a>

## Ejecutar automatización
<img src="https://img.shields.io/badge/Comando-Maven-orange" alt="Maven">

Este sería el comando MVN para lanzar la automatización de forma manual:
```mvn clean test "-Dkarate.options=--tags @MECCTMPLCO" "-Dkarate.env=pre" "-Dtest.tenant=pb" "-Dtest.authmode=basic" "-Dkarate.username=username" "-Dkarate.password=password" "-Dtest.janus=false"  -Dtest=KarateRunnerTest```

Parámetros:
* ```-Dkarate.options=--tags @MECCTMPLCO```: Opcional. Especifíca que tags se deben ejecutar. Si se pone el símbolo ```~``` por delante del tag omitirá los tests que la contengan.
* ```-Dkarate.env=pre```: Especifica el entorno donde se lanzará la automatización (pre, preint...)
* ```-Dtest.tenant=pb```: Especifica el tenant (pb, bk ...)
* ```-Dkarate.username=username```: Usuario que se usará para los tests
* ```-Dkarate.password=password```: Contraseña
* ```-Dtest.janus=false```: Determinados tests discriminan si se utiliza Janus para autenticarse o no, lo que implica utilizar URLs diferentes

## Importar los tests del testset indicado a carpeta local
<img src="https://img.shields.io/badge/Comando-Python-red" alt="Python">

Este script se conecta a JIRA y descarga los tests en la carpeta donde luego podrán ser ejecutados. Ver <a href="#estructura">Estructura</a>
```py .\communications_test_import_local.py username password testplan```

Parámetros:
* ```username```: Nombre de usuario de Inditex 
* ```password```: Coontraseña de Inditex
* ```testplan```: Id del testplan, por ejemplo COMMBRANDS-1836


## Ejecutar workflow remoto utilizando el calendario
<img src="https://img.shields.io/badge/Comando-Python-red" alt="Python">

Script que se ejecuta el workflow indicado utilizando la información del calendario
* usuario - password - github_token - id workflow - id confluence del calendario

```py .\communications_data_reader_local.py username password gh_token workflow calendar```

Parámetros:
* ```username```: Nombre de usuario de Inditex 
* ```password```: Coontraseña de Inditex
* ```gh_token```: Token de GitHub de un usuario con permisos sobre la automatización
* ```workflow```: Id del workflow que se quiere ejecutar
* ```calendar```: Id de la página del calendario en Confluence con la programación


# Workflow
<img src="https://img.shields.io/badge/GitHub-Action-blue" alt="Python">

La automatización está preparada para lanzarse de forma automática usando una programación Cron. El workflow encargado de lanzar la automatización es **COMMBRANDS_TRIGGER**

Una vez comprobado mediante Cron que se tiene que ejecutar, se ejecuta el script **communications_data_reader** pasándole las credenciales de Jira y el token de GitHub.
El script se encarga de leer el calendario de ejecuciones semanal y comprobar si para ese día tiene ejecuciones programadas. En caso de tenerla se ejecutaría el workflow **COMMUNICATIONS_LAUNCHER** pasándole todos los parámetros necesarios.

Éste se encarga de lanzar la automatización y de crear un Test Execution con todos los resultados y adjuntando el informe en formato ZIP
