const eventsToggle = document.getElementById('toggleEvents');
const eventsList = document.getElementById('eventsList');
const eventsToggleLabel = document.getElementById('toggleEventsLabel');

if (eventsToggle && eventsList && eventsToggleLabel) {
  eventsToggle.addEventListener('click', () => {
    const isExpanded = eventsToggle.getAttribute('aria-expanded') === 'true';
    eventsToggle.setAttribute('aria-expanded', String(!isExpanded));
    eventsList.classList.toggle('events-expanded', !isExpanded);
    eventsToggle.querySelector('span.material-symbols-outlined').textContent = !isExpanded ? 'expand_less' : 'expand_more';
    eventsToggleLabel.textContent = !isExpanded ? 'Mostrar menos eventos' : 'Cargar eventos anteriores';
  });
}
