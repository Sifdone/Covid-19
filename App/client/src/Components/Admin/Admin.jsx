import React, { Component } from "react";

export class Admin extends Component {
  render() {
    return <p>Click on an emoji to view the emoji short name.</p>;
  }
}
/** QUERIES *
 *  A) SELECT count(*) FROM visits
 *  B) SELECT count(*) FROM cases
 *  C) SELECT count(*) FROM visits INNER JOIN cases ON cases.USER_ID = visits.USER_ID WHERE visits.TIMESTAMP BETWEEN DATE_SUB(DATE_RECORDED,INTERVAL 7 DAY) AND DATE_ADD(DATE_RECORDED, INTERVAL 14 DAY)
 *  D) SELECT types , count(ID) FROM locations INNER JOIN visits ON locations.ID = visits.LOCATION_ID GROUP by ID ORDER BY count(visits.LOCATION_ID) DESC
 * SELECT comp , COUNT(*)
FROM
(
 SELECT JSON_EXTRACT(types, '$[0]') as comp FROM locations UNION ALL
 SELECT JSON_EXTRACT(types, '$[1]') as comp FROM locations UNION ALL
 SELECT JSON_EXTRACT(types, '$[2]') as comp FROM locations
) q
WHERE comp is not null
GROUP BY comp

 */
