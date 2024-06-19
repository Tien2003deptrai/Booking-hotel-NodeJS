-- query
 
"SELECT type_name, cost, room.room_id,availability, images, facility, facility_cost 
from (((room inner join room_type on room.type_id = room_type.type_id)
inner join room_status on room.status_id = room_status.status_id ) 
inner join facilities on room.facility_id = facilities.facility_id) 
where room.room_id not in (select room_id from reservation
where start_date between ? and ? or end_date between ? and ?)"


SELECT 
    r.room_id,
    r.images,
    rt.type_name,
    rt.cost,
    rs.availability,
    f.facility,
    f.facility_cost
FROM 
    room AS r
JOIN 
    room_type AS rt ON r.type_id = rt.type_id
JOIN 
    room_status AS rs ON r.status_id = rs.status_id
JOIN 
    facilities AS f ON r.facility_id = f.facility_id
JOIN 
    reservation AS res ON r.room_id = res.room_id
WHERE 
    (res.room_id IS NULL 
    OR NOT (res.start_date BETWEEN ? AND ? OR res.end_date BETWEEN ? AND ?))

