import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { CountyType } from '../Types/CountyType';
import { CountyDto } from '../Types/Dto/CountyDto';
import { RefereeSportDto } from '../Types/Dto/RefereeSportDto';
import { SimpleCompanyDto } from '../Types/Dto/Requests/SimpleCompanyDto';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { SimpleUserDto } from '../Types/Dto/Requests/SimpleUserDto';
import { CompanyAndUsersDto } from '../Types/Dto/Requests/CompanyAndUsersDto';

const CompanyContainer = () => {
  const { id } = useParams();
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<CompanyAndUsersDto>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReferee = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(`/company/${id}/withusers`, {
          signal: controller.signal,
        });
        isMounted && setCompany(response.data.data);
        setLoading(false);
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setLoading(false);
        if (error.response.status !== 500) {
          navigate('/login', { state: { from: location }, replace: true });
        } else {
          setError(true);
          console.log(error);
          setErrorMsg(error.response.data.message);
        }
      }
    };

    getReferee();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);

  return (
    <div className="flex flex-col px-4 text-gray-900 dark:text-white">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{errorMsg}</p>
      ) : (
        company !== undefined && (
          <div>
            <h2>
              {company?.id}: {company?.name}
            </h2>
            <p>Stad: {company?.city}</p>
            <p>Län: {CountyType[company?.county]}</p>
            <p>Email: {company?.email}</p>
            <br/>
            <p>Kontaktpersoner</p>
            <ul>
              {company?.users?.map((user: SimpleUserDto) => (
                <li key={user.email}>
                  {user.surname} {user.lastname} {user.email}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default CompanyContainer;
