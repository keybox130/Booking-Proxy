
- fix clearDates button (doesnt work when clearing selected days if some are already selected);
- - - - - - 
# PROBLEMS
- So when there are marked out dates, if you select new dates it causes the re-render algo to run. So do get over this we could maybe write a conditional or switch bool to track it, and grab the already selected days maybe in state ? 
(have to add to selected algo to account for those dates if they exist and then have an additional else if clause to make those days unselected...)
