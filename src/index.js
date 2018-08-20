const GROUP_URL = `http://localhost:3000/a_cappella_groups`

document.addEventListener('DOMContentLoaded',() =>{

  renderTheGroups()

  function getTheGroups(){
    return fetch(GROUP_URL)
      .then(res => res.json())
  }

  function renderTheGroups(){
    getTheGroups().then(groups => {
      const groupTable = document.getElementById('group-table')
      groups.forEach(group => {
        const groupRow = document.createElement('tr')
        groupRow.dataset.id = group.id
        groupRow.id = `group-${group.id}`

        const groupCollege = document.createElement('td')
          groupCollege.innerText = group.college.name
          groupCollege.id = `college-${group.id}`

        const groupName = document.createElement('td')
          groupName.innerText = group.name
          groupName.id = `name-${group.id}`
        const groupMembership = document.createElement('td')
          groupMembership.innerText = group.membership
          groupMembership.id = `membership-${group.id}`
        const groupDivision = document.createElement('td')
          groupDivision.innerText = group.college.division
          groupDivision.id = `division-${group.id}`
        const groupCrown = document.createElement('td')
        const crownBttn = document.createElement('button')

        crownBttn.innerHTML = `<img data-id="${group.id}" src="./assets/trophy.png"/>`
        crownBttn.addEventListener('click', crownWinner)
        groupCrown.append(crownBttn)

        groupRow.append(groupCollege, groupName, groupMembership, groupDivision, groupCrown)
        groupTable.append(groupRow)

      })
    })
  }

  function crownWinner(e){
    const groupID = e.target.dataset.id
    const winDiv = document.getElementById('winner')
    const groupName = document.getElementById(`name-${groupID}`).innerText
    const groupRows = document.querySelectorAll('tr')
    const thisRow = document.getElementById(`group-${groupID}`)
    winDiv.innerText = `Winner: ${groupName}`

    resetDisplay(groupRows)
    thisRow.hidden = true

  }

  function resetDisplay(table){
    table.forEach((row) => {
      row.hidden = false
    })
  }

})
