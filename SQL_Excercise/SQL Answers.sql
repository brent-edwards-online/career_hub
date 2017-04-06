--SQL 1:
--The client is running a competition for students who log into CareerHub between two dates. The
--client would like an export from the database with a row for each student who logged in at least--
--once and a count of how many times each student logged in, ordered by number of logins from
--most to least.

SELECT j.FirstName + ' ' + j.LastName as Name, Count(a.UserId) as 'Count of logins'
FROM JobSeekers j 
INNER JOIN Users u ON j.UserId = u.Id
INNER JOIN Users_AccessLog a ON u.Id = a.UserId
WHERE a.LoginDate >= '20150701 00:00:00' AND  a.LoginDate < '20150716 00:00:00'
GROUP BY j.FirstName + ' ' + j.LastName 
ORDER BY Count(a.UserId) DESC


-- SQL 2:
-- CareerHub has a labelling function that enables users to be grouped together. The database
-- stores the linking in a table named users_labels which has two columns (UserID, LabelID). The
-- LabelID is an integer that relates to the ID of the label that links the group together.
-- The exercise is to insert any JobSeekers into the users_labels table that match the following
-- criteria:
--   External ID has more than 10 characters
--   IsProvisioned = false
--   AcceptedTermsDate is complete (this is a DateTime that is complete when the student accepts
-- the terms & conditions)
-- The LabelID for this exercise is the int 151. There may also be existing records for some UserID's
-- and LabelID 151 so these should be excluded.

INSERT INTO  Users_Labels (LabelId, EntityID)
SELECT 151, j.UserId 
FROM JobSeekers j 
WHERE (Len(j.ExternalId) > 10) 
AND j.IsProvisioned = 0
AND j.AcceptedTermsDate Is Not Null
AND (j.UserId NOT IN (SELECT EntityId FROM Users_Labels WHERE LabelId = 151))
