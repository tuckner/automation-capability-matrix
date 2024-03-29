# Automation Capability Matrix

The Automation Capability Matrix is a framework for analyzing automated workflows an organization has implemented. This [interactive tool](https://automation-capability-matrix.pages.dev/) allows for anyone to assess their security automation program by aligning workflows to common automation capabilities.

<img width="1457" alt="image" src="https://github.com/tuckner/automation-capability-matrix/assets/8551704/e4123a21-8de0-4f7a-bb33-50d9cd84922e">


## Features
- Add new capabilities with descriptions
- Light/dark mode
- Order capabilities by importance
- Track workflows that align with capabilities
- Local browser storage of configuration
- Export of configuration
- Configuration import

## Future improvements

- Export to more file formats
- More matrices
- References in capabilities
- Linked workflow view
- Accounts
- Metrics & dashboard
- API

## Run

### Installation
1. Clone this repository into your local machine
```
git clone https://github.com/tuckner/automation-capability-matrix.git
```
2. Install dependencies 
```
yarn install
```
3. Run developer mode
```
yarn run dev
```
4. Run preview mode
```
yarn run test
```

### Docker

1. Build image

```
docker build . -t acm
```

2. Run image

```
docker run -p 3000:3000 acm
```

3. Access service at `http://localhost:3000`

#### Credit

- [dodoburner](https://github.com/dodoburner/kanban-task-management-web-app)
- [sandygudie](https://github.com/sandygudie/Kanban-App)
