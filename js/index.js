let contentLoaded = false // adiciona uma variável de controle para evitar execução desnecessária da função getContent()

async function getContent() {
  try {
    const response = await fetch("./src/data/news.json")
    const data = await response.json()

    const newsContainer = document.querySelector("#news-container")
    if (newsContainer) {
      newsContainer.innerHTML = "" // Limpa o conteúdo anterior

      data.news.forEach((newsItem) => {
        const newsItem = document.createElement("div")
        newsItem.classList.add("news")

        const title = document.createElement("h2")
        title.classList.add("title")
        title.textContent = item.title
        newsItem.appendChild(title)

        const description = document.createElement("p")
        description.classList.add("description")
        description.textContent = item.description
        newsItem.appendChild(description)

        const author = document.createElement("p")
        author.classList.add("author")
        const linkIcon = document.createElement("i")
        linkIcon.classList.add("fa-sharp", "fa-solid", "fa-link")
        author.appendChild(linkIcon)
        author.textContent = item.author
        newsItem.appendChild(author)

        newsContainer.appendChild(newsItem)
      })

      const scrollTop = window.scrollY
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const percentScrolled = (scrollTop / totalHeight) * 100

      const divProgress = document.querySelector("#reading-progress")
      const readingProgress = document.querySelector(".progress")
      readingProgress.value = percentScrolled

      const progressPercent = document.querySelector(".progress-percent")
      progressPercent.textContent = `${Math.round(percentScrolled)}%`

      // verifica se a pessoa chegou ao final da página e se a função getContent() ainda não foi executada
      if (scrollTop === totalHeight && !contentLoaded) {
        // esconde a barra de progresso
        readingProgress.style.display = "none"
        progressPercent.style.display = "none"
        divProgress.style.display = "none"

        // mostra o botão de voltar ao topo
        const backToTopButton = document.querySelector(".back-to-top")
        backToTopButton.style.display = "block"

        // adiciona evento de clique para o botão de voltar ao topo
        backToTopButton.addEventListener("click", () => {
          readingProgress.style.display = "block"
          progressPercent.style.display = "inline-block"
          divProgress.style.display = "flex"

          backToTopButton.style.display = "none"
          window.scrollTo({ top: 0, behavior: "smooth" })
        })

        contentLoaded = true // atualiza a variável de controle para evitar execução desnecessária da função getContent() no futuro

        // exibe o alert de parabéns
        const currentDate = new Date().toLocaleDateString()
        alert(
          `Parabéns! Você leu todas as notícias importantes sobre tecnologia no dia ${currentDate}.`
        )
      } else if (scrollTop < totalHeight && contentLoaded) {
        // mostra a barra de progresso novamente
        readingProgress.style.display = "block"
        progressPercent.style.display = "block"

        // esconde o botão de voltar ao topo
        const backToTopButton = document.querySelector(".back-to-top")
        backToTopButton.style.display = "none"

        contentLoaded = false // atualiza a variável de controle para permitir a execução da função getContent() novamente
      }
    }
  } catch (error) {
    const errorMessage = document.createElement("p")
    errorMessage.textContent =
      "Ocorreu um erro ao buscar as notícias. Por favor, tente novamente mais tarde."
    const newsContainer = document.querySelector("#news-container")
    newsContainer.appendChild(errorMessage)
    console.log(error)
  }
}

window.addEventListener("scroll", getContent)

getContent()
