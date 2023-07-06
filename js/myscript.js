function showPubs(id) {
    if (id == 1) {
      document.getElementById('pubs').innerHTML = document.getElementById('pubs_by_date').innerHTML;
      document.getElementById('select1').style = 'text-decoration:underline;color:#000000';
      document.getElementById('select2').style = "";
    } else if (id == 2) {
      document.getElementById('pubs').innerHTML = document.getElementById('pubs_by_topic').innerHTML;
      document.getElementById('select2').style = 'text-decoration:underline;color:#000000';
      document.getElementById('select1').style = "";
    } else {
	  console.log(id);
	}
  }


  