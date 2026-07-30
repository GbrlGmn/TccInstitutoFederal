<div align="center">

# 🔧 Sistema de Gerenciamento de Serralheria

### Trabalho de Conclusão de Curso — Instituto Federal do Paraná (IFPR)

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

---

## 📋 Sobre o projeto

Sistema desenvolvido como **Trabalho de Conclusão de Curso (TCC)** do Instituto Federal do Paraná (IFPR), com o objetivo de digitalizar e otimizar a gestão de uma serralheria — controlando clientes, funcionários, ordens de serviço, orçamentos e recibos de forma centralizada.

O projeto é dividido em duas frentes:

- **Backend** — API REST em Java com Spring Boot
- **Frontend** — Interface web em React

## ✨ Funcionalidades

- 👤 **Clientes** — cadastro completo com *soft delete*, mantendo o histórico mesmo após "exclusão"
- 🧑‍🔧 **Funcionários** — gerenciamento da equipe responsável pelas ordens de serviço
- 🧾 **Ordens de Serviço** — controle de status (`ORÇAMENTO`, `EM ANDAMENTO`, `FINALIZADA`, `CANCELADA`), datas de abertura/fechamento e valores
- 🧮 **Itens da Ordem de Serviço** — detalhamento dos serviços/materiais de cada ordem
- 🧷 **Recibos** — emissão vinculada às ordens de serviço concluídas

## 🛠️ Tecnologias

<table>
<tr>
<td valign="top" width="50%">

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Lombok
- Maven

</td>
<td valign="top" width="50%">

### Frontend
- React
- Vite
- JavaScript (JSX)

</td>
</tr>
</table>

## 🏗️ Arquitetura

O backend segue uma **arquitetura em camadas**, separando claramente as responsabilidades:

```
Controller  →  Service  →  Repository  →  Model
                              ↑
                             DTO
```

- **Model** — entidades JPA (`Cliente`, `Funcionario`, `OrdemServico`...)
- **Repository** — acesso a dados via Spring Data JPA
- **Service** — regras de negócio
- **Controller** — exposição dos endpoints REST
- **DTO** — objetos de transferência entre as camadas e a API

## 📁 Estrutura do projeto

```
📦 tcc-serralheria
├── 📂 backend
│   ├── 📂 data
│   ├── 📂 src
│   │   └── main/java/edu/ifpr/tccinstitutofederal/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       ├── model/
│   │       └── dto/
│   ├── 📂 wrapper
│   ├── pom.xml
│   └── mvnw / mvnw.cmd
│
└── 📂 frontend
    ├── 📂 assets
    ├── 📂 components
    ├── 📂 pages
    ├── 📂 services
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## 🚀 Como executar

### Pré-requisitos
- Java 17+
- Node.js 18+
- Maven (ou usar o `mvnw` incluso)

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👥 Autores

Projeto desenvolvido em dupla como Trabalho de Conclusão de Curso — Instituto Federal do Paraná (IFPR).

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
Feito com 💙 no IFPR
</div>
