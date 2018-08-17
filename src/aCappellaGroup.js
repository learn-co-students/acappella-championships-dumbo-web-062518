document.addEventListener('DOMContentLoaded', () => {

  showAcapellaGroups()

  // FETCHING

  const ACAPELLA_URL = `http://localhost:3000/a_cappella_groups`

  function fetchAcapellaGroups() {
    return fetch(`http://localhost:3000/a_cappella_groups`)
      .then(res => res.json())
  }

  function fetchGroup(id) {
    return fetch(`http://localhost:3000/a_cappella_groups/${id}`)
      .then(res => res.json())
  }

  // END FETCHING

  function showAcapellaGroups() {
    const groupsData = fetchAcapellaGroups()
    const tableBody = document.getElementById('table-body')
    groupsData.then(groups => {
      groups.forEach(group => {
        // console.log(group)
        const tr = document.createElement('tr')
        tr.dataset.id = group.id
        const college = document.createElement('td')
        college.innerHTML = group.college.name
        const groupName = document.createElement('td')
        groupName.innerHTML = group.name
        const membershipCont = document.createElement('td')
        membershipCont.innerHTML = group.membership
        const division = document.createElement('td')
        division.innerHTML = group.college.division
        const imgCont = document.createElement('td')
        const img = document.createElement('img')
        img.src = './assets/trophy.png'
        img.id = group.id
        img.addEventListener('click', () => {
          const winnerDisplay = document.getElementById('winner')
          if (winnerDisplay.innerText === 'Winner:') {
              tr.innerHTML = ''
              addWinner(group.id)
          } else {
              const id = document.getElementById('winner').dataset.id
              renderLoser(id)
              tr.innerHTML = ''
              addWinner(group.id)
            }
        })

        // APPEND VIEWS
        imgCont.appendChild(img)
        tr.append(college, groupName, membershipCont, division, imgCont)
        tableBody.appendChild(tr)
      })
    })
  }




  function addWinner(id) {
      const winnerDisplay = document.getElementById('winner')
      const group = fetchGroup(id)
      group.then(group => {
        winnerDisplay.innerHTML = `Winner: ${group.name}`
        winnerDisplay.dataset.id = group.id
      })
  }

  function renderLoser(id) {
    const tableBody = document.getElementById('table-body')
    const group = fetchGroup(id)
    group.then(group => {
      const tr = document.createElement('tr')
      tr.dataset.id = group.id
      const college = document.createElement('td')
      college.innerHTML = group.college.name
      const groupName = document.createElement('td')
      groupName.innerHTML = group.name
      const membershipCont = document.createElement('td')
      membershipCont.innerHTML = group.membership
      const division = document.createElement('td')
      division.innerHTML = group.college.division
      const imgCont = document.createElement('td')
      const img = document.createElement('img')
      img.src = './assets/trophy.png'
      img.id = group.id
      img.addEventListener('click', () => {
        tr.innerHTML = ''
        addWinner(group.id)
      })

      // APPEND VIEWS
      imgCont.appendChild(img)
      tr.append(college, groupName, membershipCont, division, imgCont)
      tableBody.appendChild(tr)
    })
  }

});
