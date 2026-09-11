# 🚕 Unitaxi & Turismo — Site Comercial de Táxi e Turismo

![Status](https://img.shields.io/badge/Status-Em%20Produção-success)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-orange)

Site comercial desenvolvido para uma empresa real de táxi e turismo receptivo em João Pessoa (PB), com foco em **captação de clientes, experiência mobile, performance, acessibilidade e presença orgânica no Google**.

🔗 **Site em produção:** [unitaxi-turismo.vercel.app](https://unitaxi-turismo.vercel.app/)

## 🎯 Contexto e objetivo

A Unitaxi & Turismo é uma empresa real do setor de transporte e turismo. O projeto foi desenvolvido para modernizar sua presença digital e criar um canal próprio de aquisição de clientes.

Em vez de funcionar apenas como um cartão de visitas, o site foi pensado como uma ferramenta comercial: apresenta os serviços e roteiros, transmite confiança ao visitante e reduz o atrito entre a descoberta da empresa e a solicitação de um orçamento.

O principal fluxo de conversão leva o usuário até o WhatsApp com os dados da viagem já estruturados, facilitando tanto a experiência do cliente quanto o atendimento da empresa.

## 🚀 Principais funcionalidades

- **Experiência Mobile-First:** interface responsiva e otimizada para celulares, importante para turistas que acessam o site durante deslocamentos, no aeroporto ou já no destino.
- **Cotação de transfer:** formulário com origem, destino, data, horário e quantidade de passageiros, gerando automaticamente uma mensagem estruturada para o WhatsApp.
- **Catálogo de passeios:** roteiros organizados e filtráveis por região, permitindo que o visitante encontre rapidamente opções de interesse.
- **Contato orientado à conversão:** CTAs distribuídos estrategicamente pelo site e integração direta com WhatsApp.
- **Conteúdo real da empresa:** apresentação da equipe, serviços, frota, diferenciais e avaliações de clientes.
- **Google Analytics:** acompanhamento do tráfego e comportamento dos visitantes para orientar melhorias futuras.
- **Google Search Console:** monitoramento de indexação e desempenho orgânico nas buscas.
- **SEO Local:** conteúdo e estrutura técnica direcionados às buscas por táxi, transfer e turismo em João Pessoa e região.

## 🔎 SEO e presença digital

O projeto não termina no desenvolvimento visual da página. A estratégia inclui também acompanhamento e otimização da presença digital da empresa.

Foram implementados ou configurados:

- meta description e URL canônica;
- Open Graph e Twitter Cards;
- dados estruturados em JSON-LD com Schema.org;
- `robots.txt` e `sitemap.xml`;
- Google Search Console;
- Google Analytics;
- otimizações relacionadas ao Perfil da Empresa no Google;
- conteúdo preparado para indexação mesmo sem dependência de JavaScript;
- `llms.txt` e uma versão textual das principais informações públicas para facilitar descoberta e interpretação por agentes e assistentes.

Atualmente o projeto utiliza o endereço fornecido pela Vercel. A adoção de um domínio próprio é uma das próximas etapas da presença digital da empresa.

## ⚡ Performance e acessibilidade

A arquitetura foi mantida propositalmente leve, evitando frameworks desnecessários para o escopo da aplicação.

Entre as otimizações implementadas estão:

- fontes hospedadas localmente com `font-display: swap`;
- imagens responsivas e formatos otimizados;
- carregamento prioritário de recursos importantes;
- HTML semântico;
- navegação por teclado;
- atributos ARIA em menus e formulários;
- gerenciamento de foco no menu mobile;
- suporte a `prefers-reduced-motion`;
- mensagens de erro acessíveis nos formulários;
- validação adicional de datas e horários no JavaScript;
- funcionamento do conteúdo essencial mesmo quando JavaScript está indisponível.

## 🧩 Desafios técnicos resolvidos

### Validação de datas e horários em dispositivos móveis

Os controles nativos de data e horário podem apresentar comportamentos diferentes entre navegadores e dispositivos. Além das restrições nativas do HTML, foi implementada validação em JavaScript para impedir solicitações com datas passadas ou horários que já ocorreram no dia atual.

### Compatibilidade com iOS

O layout dos campos nativos de data e horário exigiu tratamento específico para manter o formulário consistente em telas menores e dispositivos iOS.

### Acessibilidade do menu responsivo

O menu mobile controla `aria-expanded`, atualiza seu rótulo conforme o estado, pode ser fechado com a tecla `Escape` e devolve o foco ao elemento adequado quando necessário.

### Performance sem dependências desnecessárias

Para uma landing page comercial, adicionar um framework significaria aumentar a quantidade de JavaScript entregue ao usuário sem uma necessidade proporcional. Por isso, o projeto utiliza JavaScript Vanilla e mantém grande parte do conteúdo diretamente no HTML.

### Conversão sem backend desnecessário

O formulário organiza e valida as informações no navegador e gera uma mensagem pronta para o WhatsApp. Isso atende ao fluxo comercial atual da empresa sem introduzir infraestrutura de servidor apenas para intermediar o contato.

## 💻 Tecnologias e arquitetura

- **HTML5:** estrutura semântica e conteúdo indexável.
- **CSS3:** design responsivo, sistema visual próprio e ajustes de acessibilidade.
- **JavaScript Vanilla:** filtros, validações, menu responsivo e integração com WhatsApp.
- **Google Analytics:** mensuração de tráfego e comportamento.
- **Google Search Console:** acompanhamento da presença na pesquisa orgânica.
- **Schema.org / JSON-LD:** dados estruturados para mecanismos de busca.
- **Git & GitHub:** versionamento e histórico de evolução do projeto.
- **Vercel:** hospedagem e deploy contínuo integrado ao repositório.

## 🏗️ Processo de desenvolvimento

O projeto evoluiu de forma incremental, com melhorias separadas em branches e pull requests para facilitar revisão e rastreabilidade. Entre as etapas estiveram ajustes de responsividade, compatibilidade com iOS, acessibilidade, qualidade e responsividade de imagens, fontes locais, SEO, favicon e configuração de Analytics.

Ferramentas de Inteligência Artificial, incluindo Claude e Gemini, foram utilizadas como apoio durante etapas de implementação e revisão. As decisões de produto, arquitetura, regras de negócio, validação, testes no contexto real da empresa e evolução do projeto foram conduzidas pelo autor.

## 📈 Projeto em produção

Este não é um projeto fictício criado apenas para portfólio. O site atende uma empresa real e está sendo utilizado como parte de sua presença digital.

Isso permite que o desenvolvimento continue orientado por dados e necessidades reais. Com Google Analytics, Search Console e o Perfil da Empresa no Google, novas decisões podem ser tomadas a partir de tráfego, consultas de pesquisa, indexação e comportamento dos visitantes, em vez de apenas preferências visuais.

## 🛣️ Diferencial: tecnologia + conhecimento do negócio

O projeto combina desenvolvimento de software com conhecimento prático da operação de transporte e turismo. A estrutura de conteúdo e os fluxos foram construídos considerando dúvidas e necessidades reais dos passageiros: segurança, conforto, bagagem, horários, origem, destino, quantidade de passageiros e facilidade para solicitar atendimento.

Essa proximidade com o negócio permitiu transformar requisitos comerciais em decisões concretas de UX e implementação.

## 🔭 Próximos passos

- configurar um domínio próprio;
- acompanhar métricas de aquisição e conversão no Analytics;
- acompanhar consultas e posicionamento pelo Search Console;
- continuar aprimorando o SEO local e o Perfil da Empresa no Google;
- utilizar dados reais de uso para orientar novos testes e melhorias de conversão.

## 👨‍💻 Autor

**Matheus Bosisio Abrantes**

- Bacharelando em Ciência da Computação — UFPB
- [LinkedIn](https://www.linkedin.com/in/matheus-bosisio-abrantes-953751208/)
- [GitHub](https://github.com/matheusbosisio)

## 🤖 Descoberta e conteúdo para assistentes

- `robots.txt` permite leitura das páginas públicas e aponta para `sitemap.xml`.
- `llms.txt` indexa informações oficiais e `informacoes.md` resume o conteúdo público.
- O Markdown é disponibilizado por URL própria e anunciado no HTML por `rel="alternate"`.
- O catálogo e as informações principais permanecem disponíveis no HTML sem JavaScript.
- `404.html` utiliza o mecanismo nativo da Vercel para caminhos inexistentes.

Ao alterar serviços, contatos ou o processo de orçamento, os arquivos auxiliares de descoberta também devem ser revisados para permanecerem consistentes com o conteúdo principal.